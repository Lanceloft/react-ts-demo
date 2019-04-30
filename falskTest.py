from flask import Flask, request
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
parser.add_argument('id')


client = pymongo.MongoClient(host='localhost', port=27017)
db = client.test
collection = db.todos

idCollection = db.students

class TestRoute(Resource):
    def get(self):
        print(request.args.get("id"))
        if request.args.get("id") == '':
            results = json.loads(dumps(list(collection.find({}))))
            res = {
              "status": 0,
              "data": results
            }
            return res
        else:
            results = json.loads(dumps(list(collection.find({"id": int(request.args.get("id"))}))))
            res = {
              "status": 0,
              "data": results
            }
            return res


    def post(self):
        args = parser.parse_args()
        insertId = idCollection.insert_one({'id': idCollection.find().count()})
        result = collection.insert_one({'task': args['task'], 'id': idCollection.find().count()})
        res = {
          "status": 0,
        }
        return res

class DeleteRouter(Resource):
    def post(self):
        args = parser.parse_args()
        result = collection.delete_one({'id': int(args['id'])})
        res = {
          "status": 0,
        }
        return res


api.add_resource(TestRoute, '/test')
api.add_resource(DeleteRouter, '/test/delete')

if __name__ == '__main__':
    app.run(debug=True)
