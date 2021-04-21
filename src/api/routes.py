"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import re
import requests
from datetime import datetime
from basicauth import decode
from api.models import db, CryptoUser, Account, CryptoCoins, CryptoTransaction
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/User', methods=["GET"])
def get_user ():
    users = CryptoUser.query.all()
    # request_body = list(map(lambda x:x.serialize(),users))
    result = [user.serialize() for user in CryptoUser.query.all()]
    # return jsonify(request_body),200
    return jsonify(result),200

@api.route('/FillCryptoData', methods=["POST"])
def FillCryptoData ():
    
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

    payload={}
    headers = {
    'X-CMC_PRO_API_KEY': 'd23ea42b-4f22-47b3-8e28-4650f23c4096',
    'Cookie': '__cfduid=da8b513c9ecb27846d9c63fec5a2b69001617764257'
    }

    response = requests.get(url, headers=headers, data=payload)

    r_dictionary = response.json()

    for coin in r_dictionary["data"]:
        Crypto = CryptoCoins.query.filter_by(symbol=coin["symbol"]).first()
        
        if Crypto is None:
            newcoin = CryptoCoins(coin["name"],coin["symbol"],coin["cmc_rank"])
            db.session.add(newcoin)
            db.session.commit()

    return jsonify({"msg": "Cryptocoins added successfully"}),200

@api.route('/Login', methods=["GET"])
def Login():
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

@api.route('/Register', methods=["POST"])
def Register ():
    data = request.get_json()
    user = CryptoUser(data["firstName"],data["lastName"],data["email"],data["password"])
    db.session.add(user)
    db.session.commit()

    Newuser = CryptoUser.query.filter_by(email=data["email"], is_Active=True).first()
    Newuser.CreateUserCode()
    db.session.flush()
    db.session.commit()

    return jsonify("Message : Se adiciono el usuario!"),200
    return jsonify(request_body),200

@api.route('/ValidateUser/<string:id>', methods=["GET"])
def ValidateUser(id):
    # for validating an Email
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
    if(re.search(regex, id)):
        # Validate User
        user = CryptoUser.query.filter_by(email=id, is_Active=True).first()
        if user is None:
            return jsonify({"msg": "User Email Valid"}),200

        # Return Error    
        return jsonify({"msg": "User Email already exist"}),406
    
    else:
        return jsonify({"msg": "User Invalid Email"}),411
 


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

@api.route('/MainBalance/<int:id>', methods=["POST"])
@jwt_required()
def MainBalance(id):
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    accounts = []
    if id == 0:
        accounts = Account.query.filter_by(userID = current_user_id)        
    else:
        accounts = Account.query.filter_by(userID = current_user_id, coinID= id)
    
    result = [account.serializebyUser() for account in accounts]
    
    return jsonify(result),200

@api.route('/CreateAccount', methods=["POST"])
@jwt_required()
def CreateAccount():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    existAccount = Account.query.filter_by(userID=current_user_id, coinID=data["coinID"]).first()

    if existAccount is None:
        newaccount = Account(current_user_id,data["coinID"],data["amount"])
        db.session.add(newaccount)
        db.session.commit()

        FromAccount = Account.query.filter_by(userID = current_user_id, coinID= data["coinID"]).first()

        newtrans = CryptoTransaction(data["date"],current_user_id,current_user_id,FromAccount.id,data["amount"])
        db.session.add(newtrans)
        db.session.commit() 
        
        return jsonify(newaccount.serializebyUser()),200 

    else:
        return jsonify({"msg": "Ya hay una cuenta creada con dicha moneda"}),406 


@api.route('/Deposit', methods=["POST"])
@jwt_required()
def Deposit():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    FromAccount = Account.query.filter_by(userID = current_user_id, coinID= data["coinID"]).first()
    
    # Varification if Exist Account
    if FromAccount is None:
        newaccount = Account(current_user_id,data["coinID"],data["amount"])
        db.session.add(newaccount)
        db.session.commit()
        
        FromAccount = Account.query.filter_by(userID = current_user_id, coinID= data["coinID"]).first()

    # Deposit
    FromAccount.Deposit(data["amount"])
    db.session.flush()
    db.session.commit()  

    newtrans = CryptoTransaction(data["date"],current_user_id,current_user_id,FromAccount.id,data["amount"])
    db.session.add(newtrans)
    db.session.commit() 

    return jsonify({"msg": "El Deposito se realizó satisfactoriamente"}),200

@api.route('/Transfer', methods=["POST"])
@jwt_required()
def Transfer():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    FromAccount = Account.query.filter_by(userID = current_user_id, coinID= data["coinID"]).first()
    
    if FromAccount is None:
        return jsonify({"msg": "El usuario no posee una cuenta de dicha moneda"}),400  
    elif FromAccount.balance < data["amount"]:
        return jsonify({"msg": "El usuario no posee una saldo suficiente"}),400  
    else:
        UserFinal = CryptoUser.query.filter_by(userCode=data["UserCode"], is_Active=True).first()

        if UserFinal is None:
            return jsonify({"msg": "El destinatario no existe"}),400  

        else:
            ToAccount = Account.query.filter_by(userID = UserFinal.id, coinID= data["coinID"]).first()
        
            if ToAccount is None:
                newaccount = Account(UserFinal.id,data["coinID"],data["amount"])
                db.session.add(newaccount)
                db.session.commit()

                ToAccount = Account.query.filter_by(userID = UserFinal.id, coinID= data["coinID"]).first()
    
            # Retiro
            FromAccount.Deposit((0-data["amount"]))
            db.session.flush()
            db.session.commit()    

            newtrans = CryptoTransaction(data["date"],current_user_id,UserFinal.id,FromAccount.id,(0 - data["amount"]))
            db.session.add(newtrans)
            db.session.commit()    

            # Deposito
            ToAccount.Deposit(data["amount"])
            db.session.flush()
            db.session.commit()  

            newtrans = CryptoTransaction(data["date"],current_user_id,UserFinal.id,ToAccount.id,data["amount"])
            db.session.add(newtrans)
            db.session.commit() 

            return jsonify({"msg": "La transferencia se realizó satisfactoriamente"}),200  

@api.route('/History/<int:id>', methods=["POST"])
@jwt_required()
def History(id):
    data = request.get_json()
    Transactions = CryptoTransaction.query.filter(CryptoTransaction.accountID == id)
    result = [item.serialize() for item in Transactions]

    return jsonify(result), 200
