from flask import Flask, request
from flask_cors import CORS
from flask_restful import reqparse, abort, Api, Resource
from bson.json_util import loads, dumps, RELAXED_JSON_OPTIONS, CANONICAL_JSON_OPTIONS
import pymongo
import json
import urllib.parse

import oss2
from itertools import islice

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

auth = oss2.Auth('LTAIEVSSmwrMsEkn', 'ZGHUz0XVhoWjK6KQ7JgALmBLtV5SSo')
bucket = oss2.Bucket(auth, 'http://oss-ap-southeast-1.aliyuncs.com', 'ts-img')

class GetCos(Resource):
    def get(self):
        imageList = []
        for obj in oss2.ObjectIterator(bucket, delimiter = '/'):
            param = {
                'name': obj.key,
                'url': 'https://ts-img.oss-ap-southeast-1.aliyuncs.com/' + obj.key
            }
            imageList.append(param)
        returnList = {
            'list': imageList,
            'status': 0
        }
        return returnList
