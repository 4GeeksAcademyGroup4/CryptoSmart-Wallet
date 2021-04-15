from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class CryptoUser(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastName = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_Active = db.Column(db.Boolean(), unique=False, nullable=False)
    accounts = db.relationship('Account',backref='user', lazy=True)
    transactions = db.relationship('Transaction',backref='user', lazy=True)

    def __repr__(self):
        return '<CryptoUser %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastName": self.lastName,
            "email": self.email,
            "is_Active": self.is_Active,
            # do not serialize the password, its a security breach
        }

class CryptoCoins(db.Model):
    __tablename__ = "coins"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    symbol = db.Column(db.String(120), unique=True, nullable=False)
    accounts = db.relationship('Account',backref='coins', lazy=True)
    transactions = db.relationship('Transaction',backref='coins', lazy=True)

    def __repr__(self):
        return '<CryptoCoins %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "symbol": self.symbol,
            # do not serialize the password, its a security breach
        }


class Account(db.Model):
    __tablename__ = "accounts"
    id = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.id'))
    coinID = db.Column(db.Integer, db.ForeignKey('coins.id'))
    balance = db.Column(db.Numeric,unique=True, nullable=False)

    def __repr__(self):
        return '<Account %r>' % self.userID

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
    amount = db.Column(db.Numeric,unique=True, nullable=False)