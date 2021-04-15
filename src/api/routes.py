"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, CryptoUser, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/user', methods=["GET"])
def get_user ():
    users = CryptoUser.query.all()
    request_body = list(map(lambda users:users.serialize(),users))
    return jsonify(request_body),200

@api.route('/user', methods=["POST"])
def post_user ():
    data = request.get_json()
    user = CryptoUser(name=data["name"],lastName=data["lastName"],email=data["email"],is_Active=data["is_Active"],password=data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify("Message : Se adiciono el usuario!"),200
    return jsonify(request_body),200