"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, CryptoUser
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/user', methods=['POST', 'GET'])
def get_users():

    # response_body = {
    #     "msg": "Hello, this is your GET /user response "
    # }

    users_alls = CryptoUser.query.all()

    result = list(map(lambda x: x.serialize(), users_alls))

    return jsonify(result), 200