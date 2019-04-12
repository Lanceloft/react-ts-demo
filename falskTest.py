from flask import Flask
from flask_cors import CORS
from flask_restful import reqparse, abort, Api, Resource
from bson.json_util import loads, dumps, RELAXED_JSON_OPTIONS, CANONICAL_JSON_OPTIONS
import pymongo
import json

app = Flask(__name__)
api = Api(app)
CORS(app)

parser = reqparse.RequestParser()
parser.add_argument('task')

class TestRoute(Resource):

    def get(self):
        client = pymongo.MongoClient(host='localhost', port=27017)
        db = client.test
        collection = db.todos
        results = json.loads(dumps(list(collection.find({}, {"_id" : 0}))))
        print(results)
        res = {
          "status": 0,
          "data": results
        }
        return res

    def post(self):
        args = parser.parse_args()
        client = pymongo.MongoClient(host='localhost', port=27017)
        db = client.test
        collection = db.todos
        result = collection.insert_one({'task': args['task']})
        res = {
          "status": 0,
        }
        return res


api.add_resource(TestRoute, '/test')

if __name__ == '__main__':
    app.run(debug=True)
