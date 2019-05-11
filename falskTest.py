from flask import Flask, request
from flask_cors import CORS
from flask_restful import reqparse, abort, Api, Resource
from bson.json_util import loads, dumps, RELAXED_JSON_OPTIONS, CANONICAL_JSON_OPTIONS
import pymongo
import json
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app, g
import hashlib

from CosPy import *

app = Flask(__name__)
api = Api(app)
CORS(app)

parser = reqparse.RequestParser()
parser.add_argument('task')
parser.add_argument('id')
parser.add_argument('image')
parser.add_argument('username')
parser.add_argument('password')

client = pymongo.MongoClient(host='localhost', port=27017)
db = client.test
collection = db.todos

idCollection = db.students
usersCollection = db.users


class TestRoute(Resource):
    def get(self):
        if request.args.get("task") == '':
            results = json.loads(dumps(list(collection.find({}))))
            res = {
              "status": 0,
              "data": results
            }
            return res
        else:
            results = json.loads(dumps(list(collection.find({"task": {"$regex": request.args.get("task")}}))))
            res = {
              "status": 0,
              "data": results
            }
            return res


    def post(self):
        args = parser.parse_args()
        insertId = idCollection.insert_one({'id': idCollection.find().count()})
        result = collection.insert_one({'task': args['task'], 'id': idCollection.find().count(), 'image': args['image']})
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

class EditRoute(Resource):
    def post(self):
        args = parser.parse_args()
        result = collection.update_one({'id': int(args['id'])}, { "$set": { "task": args['task'], "image": args['image'] } })
        if result.matched_count > 0:
            res = {
              "status": 0,
            }
            return res
        else:
            res = {
              "status": 1,
            }
            return res

class RegisterRoute(Resource):
    def post(self):
        args = parser.parse_args()
        username = args['username']
        password = args['password']
        if (usersCollection.find_one({'username': args['username']})) is None:
            insertUser = usersCollection.insert_one({'username': username, 'password': hashlib.sha256(password.encode("utf-8")).hexdigest()})
            if insertUser.inserted_id:
                res = {
                  "status": 0,
                }
                return res
            else:
                res = {
                  "status": 1,
                }
                return res
        else:
            res = {
                "status": 1,
                "message": '用户名重复'
            }
            return res

class LoginRouter(Resource):
    def post(self):
        args = parser.parse_args()
        username = args['username']
        password = args['password']
        if (usersCollection.find_one({'username': args['username']})) is None:
            res = {
                "status": 1,
                "message": '用户不存在'
            }
            return res
        else:
            if (hashlib.sha256(password.encode("utf-8")).hexdigest() == usersCollection.find_one({'username': args['username']})['password']):
                res = {
                    "status": 0,
                    "message": '登陆成功'
                }
                return res
            else:
                res = {
                    "status": 1,
                    "message": '密码不正确'
                }
                return res


api.add_resource(TestRoute, '/test')
api.add_resource(DeleteRouter, '/test/delete')
api.add_resource(EditRoute, '/test/edit')
api.add_resource(GetCos, '/test/getImagesList')
api.add_resource(RegisterRoute, '/test/register')
api.add_resource(LoginRouter, '/test/login')


if __name__ == '__main__':
    app.run(debug=True)
