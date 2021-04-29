"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import re
import requests
import smtplib
import secrets
import string
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from basicauth import decode
from api.models import db, CryptoUser, Account, CryptoCoins, CryptoTransaction
from api.utils import generate_sitemap, APIException
from functools import wraps
from dateutil.relativedelta import relativedelta

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hola! Soy un mensaje del backend"
    }

    return jsonify(response_body), 200


@api.route('/User', methods=["GET"])
def get_user():
    users = CryptoUser.query.all()
    # request_body = list(map(lambda x:x.serialize(),users))
    result = [user.serialize() for user in CryptoUser.query.all()]
    # return jsonify(request_body),200
    return jsonify(result), 200


@api.route('/FillCryptoData', methods=["POST"])
def FillCryptoData():

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

    payload = {}
    headers = {
        'X-CMC_PRO_API_KEY': 'd23ea42b-4f22-47b3-8e28-4650f23c4096',
        'Cookie': '__cfduid=da8b513c9ecb27846d9c63fec5a2b69001617764257'
    }

    response = requests.get(url, headers=headers, data=payload)

    r_dictionary = response.json()

    for coin in r_dictionary["data"]:
        Crypto = CryptoCoins.query.filter_by(symbol=coin["symbol"]).first()

        if Crypto is None:
            newcoin = CryptoCoins(
                coin["name"], coin["symbol"], coin["cmc_rank"])
            db.session.add(newcoin)
            db.session.commit()

    return jsonify({"msg": "Cryptomonedas agregadas exitosamente"}), 200


@api.route('/Login', methods=["GET"])
def Login():
    headers = request.headers
    AuthHeader = headers['Authorization']
    email, password = decode(AuthHeader)

    # Validate User
    user = CryptoUser.query.filter_by(
        email=email.lower(), password=password).first()
    if user is None:
        return jsonify({
            "StatusID": 401,
            "msg": "Correo o Contraseña incorrecta"}), 401

    # Create Token
    delta = relativedelta(minutes=30)
    access_token = create_access_token(identity=user.id, expires_delta=delta)
    return jsonify({"token": access_token, "user_id": user.id}), 200


@api.route('/Register', methods=["POST"])
def Register():
    data = request.get_json()
    if data is None:
        return jsonify({
            "StatusID": 400,
            "msg": "La solicitud es Invalida"}), 400
    if 'firstName' not in data:
        return jsonify({
            "StatusID": 400,
            "msg": "Debe especificar un Nombre"}), 400
    if 'lastName' not in data:
        return jsonify({
            "StatusID": 400,
            "msg": "Debe especificar un Apellido"}), 400
    if 'email' not in data:
        return jsonify({
            "StatusID": 400,
            "msg": "Debe especificar un Correo Electrónico"}), 400
    if 'password' not in data:
        return jsonify({
            "StatusID": 400,
            "msg": "Debe especificar una Contraseña"}), 400

    existUser = CryptoUser.query.filter_by(email=data["email"]).first()

    if existUser is None:
        user = CryptoUser(data["firstName"].lower(), data["lastName"].lower(
        ), data["email"].lower(), data["password"])
        db.session.add(user)
        db.session.commit()

        Newuser = CryptoUser.query.filter_by(
            email=data["email"].lower(), is_Active=True).first()
        Newuser.CreateUserCode()
        db.session.flush()
        db.session.commit()

        return jsonify("Message : Se adiciono el usuario!"), 200
        return jsonify(request_body), 200

    else:
        return jsonify({
            "StatusID": 406,
            "msg": "Este email ya se encuentra registrado"}), 406


@api.route('/ValidateEmail/<string:id>', methods=["GET"])
def ValidateEmail(id):
    # for validating an Email
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
    if(re.search(regex, id)):
        # Validate User
        user = CryptoUser.query.filter_by(
            email=id.lower(), is_Active=True).first()
        if user is None:
            return jsonify({
                "StatusID": 200,
                "msg": "Email Valido"}), 200

        # Return Error
        return jsonify({
            "StatusID": 406,
            "msg": "Email Valido"}), 406

    else:
        return jsonify({
            "StatusID": 411,
            "msg": "Email Invalido"}), 411


@api.route('/ForgotPassword/<string:id>', methods=["GET"])
def ForgotPassword(id):
    # for validating an Email
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'

    if(re.search(regex, id)):
        # Validate User
        user = CryptoUser.query.filter_by(
            email=id.lower(), is_Active=True).first()

        if user is None:
            return jsonify({
                "StatusID": 404,
                "msg": "Cuenta de Email no encontrada"}), 404

        # Return Error
        # codigo generate Password
        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for i in range(8))
        user.password = password
        db.session.commit()
        # Codigo Enviar correo

        mail_content = 'Hola, se a generado una nueva contraseña para inicio de sesion: ' + password

        # The mail addresses and password
        sender_address = 'alejoguma94@gmail.com'
        sender_pass = '1234QWer@$#'
        receiver_address = user.email
        # Setup the MIME
        message = MIMEMultipart()
        message['From'] = sender_address
        message['To'] = receiver_address
        # The subject line
        message['Subject'] = 'Clave de Recuperacion Generada'
        # The body and the attachments for the mail
        message.attach(MIMEText(mail_content, 'plain'))
        # Create SMTP session for sending the mail
        session = smtplib.SMTP('smtp.gmail.com', 587)  # use gmail with port
        session.starttls()  # enable security
        # login with mail_id and password
        session.login(sender_address, sender_pass)
        text = message.as_string()
        session.sendmail(sender_address, receiver_address, text)
        return jsonify({"msg": "Nuevo Password Generado"}), 200
        session.quit()
        print('Mail enviado')
    else:
        return jsonify({
            "StatusID": 411,
            "msg": "Email Invalido"}), 411


@api.route('/MainBalance/<int:id>', methods=["GET"])
@jwt_required()
def MainBalance(id):
    # Access the identity of the current user with get_jwt_identity

    current_user_id = get_jwt_identity()
    accounts = []
    if id == 0:
        accounts = Account.query.filter_by(userID=current_user_id)
    else:
        accounts = Account.query.filter_by(userID=current_user_id, coinID=id)

    result = [account.serializebyUser() for account in accounts]

    return jsonify(result), 200


@api.route('/Account', methods=["POST"])
@jwt_required()
def CreateAccount():
    data = request.get_json()

    if data is None:
        return jsonify({
            "StatusID": 400,
            "msg": "La solicitud es Invalida"}), 400

    if 'coinID' not in data:
        return jsonify({
            "StatusID": 400,
            "msg": "Necesita especificar el ID de la moneda"}), 400
    if 'amount' not in data:
        return jsonify({
            "StatusID": 400,
            "msg": "Necesita especificar la cantidad"}), 400
    if 'date' not in data:
        return jsonify({
            "StatusID": 400,
            "msg": "Necesita especificar la cantidad"}), 400

    current_user_id = get_jwt_identity()

    existAccount = Account.query.filter_by(
        userID=current_user_id, coinID=data["coinID"]).first()

    if existAccount is None:
        newaccount = Account(current_user_id, data["coinID"], data["amount"])
        db.session.add(newaccount)
        db.session.commit()

        FromAccount = Account.query.filter_by(
            userID=current_user_id, coinID=data["coinID"]).first()

        newtrans = CryptoTransaction(
            data["date"], current_user_id, current_user_id, FromAccount.id, data["amount"])
        db.session.add(newtrans)
        db.session.commit()

        return jsonify(newaccount.serializebyUser()), 200

    else:
        return jsonify({
            "StatusID": 406,
            "msg": "Ya hay una cuenta creada con dicha moneda"}), 406


@api.route('/Deposit', methods=["PUT"])
@jwt_required()
def Deposit():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    FromAccount = Account.query.filter_by(
        userID=current_user_id, coinID=data["coinID"]).first()

    # Varification if Exist Account
    if FromAccount is None:
        newaccount = Account(current_user_id, data["coinID"], data["amount"])
        db.session.add(newaccount)
        db.session.commit()

        FromAccount = Account.query.filter_by(
            userID=current_user_id, coinID=data["coinID"]).first()

    # Deposit
    FromAccount.Deposit(data["amount"])
    db.session.commit()

    newtrans = CryptoTransaction(
        data["date"], current_user_id, current_user_id, FromAccount.id, data["amount"])
    db.session.add(newtrans)
    db.session.commit()

    return jsonify({"msg": "El Deposito se realizó satisfactoriamente"}), 200


@api.route('/Transfer', methods=["POST"])
@jwt_required()
def Transfer():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    FromAccount = Account.query.filter_by(
        userID=current_user_id, coinID=data["coinID"]).first()

    if FromAccount is None:
        return jsonify({
            "StatusID": 400,
            "msg": "El usuario no posee una cuenta de dicha moneda"}), 400
    elif FromAccount.balance < data["amount"]:
        return jsonify({
            "StatusID": 400,
            "msg": "El usuario no posee una saldo suficiente"}), 400
    else:
        UserFinal = CryptoUser.query.filter_by(
            userCode=data["UserCode"].lower(), is_Active=True).first()

        if UserFinal is None:
            return jsonify({
                "StatusID": 400,
                "msg": "El destinatario no existe"}), 400

        else:
            ToAccount = Account.query.filter_by(
                userID=UserFinal.id, coinID=data["coinID"]).first()

            if ToAccount is None:
                newaccount = Account(
                    UserFinal.id, data["coinID"], data["amount"])
                db.session.add(newaccount)
                db.session.commit()

                ToAccount = Account.query.filter_by(
                    userID=UserFinal.id, coinID=data["coinID"]).first()

            # Retiro
            FromAccount.Deposit((0-data["amount"]))
            db.session.commit()

            newtrans = CryptoTransaction(
                data["date"], current_user_id, UserFinal.id, FromAccount.id, (0 - data["amount"]))
            db.session.add(newtrans)
            db.session.commit()

            # Deposito
            ToAccount.Deposit(data["amount"])
            db.session.commit()

            newtrans = CryptoTransaction(
                data["date"], current_user_id, UserFinal.id, ToAccount.id, data["amount"])
            db.session.add(newtrans)
            db.session.commit()

            return jsonify({"msg": "La transferencia se realizó satisfactoriamente"}), 200


@api.route('/History/<int:id>', methods=["POST"])
@jwt_required()
def History(id):
    data = request.get_json()
    Transactions = CryptoTransaction.query.filter(
        CryptoTransaction.accountID == id)
    result = [item.serialize() for item in Transactions]

    return jsonify(result), 200


@api.route('/Account/<int:id>', methods=["DELETE"])
@jwt_required()
def DeleteAccount(id):

    current_user_id = get_jwt_identity()
    existAccount = Account.query.filter_by(
        userID=current_user_id, coinID=id).first()

    if existAccount is None:
        return jsonify({
            "StatusID": 404,
            "msg": "La cuenta seleccionada no existe"}), 404
    else:
        Transactions = CryptoTransaction.query.filter(
            CryptoTransaction.accountID == existAccount.id)
        for item in Transactions:
            db.session.delete(item)
            db.session.commit()

        db.session.delete(existAccount)
        db.session.commit()

        return jsonify({"msg": "Cuenta borrada existosamente"}), 200
