from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class CryptoUser(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(120), unique=False, nullable=False)
    lastName = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_Active = db.Column(db.Boolean(), unique=False, nullable=False)
    accounts = db.relationship('Account',backref='user', lazy=True)
    transactions = db.relationship('Transaction',backref='user', lazy=True)

    def __init__(self, firstname, lastName, email, password):
        self.firstname = firstname,
        self.lastName = lastName,
        self.email = email,
        self.password = password,
        self.is_Active = True

    def __repr__(self):
        return '<CryptoUser %r>' % self.firstname

    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastName": self.lastName,
            "email": self.email,
            "is_Active": self.is_Active,
            "usercode": self.firstname[0] + self.lastName + str(self.id),
            # "accounts": self.accounts
            # do not serialize the password, its a security breach
        }

class CryptoCoins(db.Model):
    __tablename__ = "coins"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    symbol = db.Column(db.String(120), unique=True, nullable=False)
    price = db.Column(db.Float,unique=True, nullable=False)
    accounts = db.relationship('Account',backref='coins', lazy=True)
    transactions = db.relationship('Transaction',backref='coins', lazy=True)

    def __repr__(self):
        return '<CryptoCoins %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "symbol": self.symbol,
            "price": self.price,
            # do not serialize the password, its a security breach
        }


class Account(db.Model):
    __tablename__ = "accounts"
    id = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.id'))
    coinID = db.Column(db.Integer, db.ForeignKey('coins.id'))
    balance = db.Column(db.Float,unique=True, nullable=False)

    def __repr__(self):
        return '<Account %r>' % self.userID

    def Deposit(self, amount):
        self.balance = self.balance + amount

    def serializebyUser(self):
        return {
            "id": self.id,
            "coinID": self.coinID,
            "balance": self.balance,
            # do not serialize the password, its a security breach
        }

    def serializebyCoin(self):
        return {
            "id": self.id,
            "userID": self.userID,
            "balance": self.balance,
            # do not serialize the password, its a security breach
        }

class Transaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime,unique=False, nullable=False)
    senderRecipientID = db.Column(db.Integer, db.ForeignKey('users.id'))
    coinID = db.Column(db.Integer, db.ForeignKey('coins.id'))
    amount = db.Column(db.Float,unique=True, nullable=False)