"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
import re
from basicauth import decode
from api.models import db, CryptoUser
from api.utils import generate_sitemap, APIException
api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=["GET"])
def get_login():
    headers = request.headers
    AuthHeader = headers['Authorization']
    username, password = decode(AuthHeader)

    # Validate User
    user = CryptoUser.query.filter_by(email=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}),401

    # Create Token
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }),200

@api.route('/user', methods=["GET"])
def get_user ():
    users = CryptoUser.query.all()
    request_body = list(map(lambda x:x.serialize(),users))
    return jsonify(request_body),200

@api.route('/ValidateEmail/<string:id>', methods=["GET"])
def ValidateEmail(id):
    # for validating an Email
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
    if(re.search(regex, id)):
        # Validate User
        user = CryptoUser.query.filter_by(email=id, is_Active=True).first()
        if user is None:
            return jsonify({"msg": "Email Valid"}),200

        # Return Error    
        return jsonify({"msg": "Email already exist"}),406
    
    else:
        return jsonify({"msg": "Invalid Email"}),411

@api.route('/register', methods=["POST"])
def register ():
    data = request.get_json()
    user = CryptoUser(data["name"],data["lastName"],data["email"],data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify("Message : Se adiciono el usuario!"),200
    return jsonify(request_body),200

@api.route('/ForgotPassword/<string:id>', methods=["GET"])
def ForgotPassword (id):
    # for validating an Email
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
    if(re.search(regex, id)):
        # Validate User
        user = CryptoUser.query.filter_by(email=id, is_Active=True).first()
        if user is None:
            return jsonify({"msg": "Email account not found"}),404

        # Return Error    
        user.password = "!234s678"
        db.session.commit()
        return jsonify({"msg": "New Password Generated"}),200
    
    else:
        return jsonify({"msg": "Invalid Email"}),411