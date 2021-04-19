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
    accounts = db.relationship('Account',backref='user')
    transactions = db.relationship('CryptoTransaction', foreign_keys='CryptoTransaction.fromID',backref='from_user')
    transactions = db.relationship('CryptoTransaction', foreign_keys='CryptoTransaction.toID',backref='to_user')

    def __init__(self, firstname, lastName, email, password):
        self.firstname = firstname,
        self.lastName = lastName,
        self.email = email,
        self.password = password,
        self.is_Active = True

    def __repr__(self):
        return '<CryptoUser %r>' % self.firstname

    def serializeName(self):
        return {
            "usercode":self.firstname[0] + self.lastName + str(self.id),
            "firstname": self.firstname,
            "lastName": self.lastName,
        }

    def serialize(self):
        if len(self.accounts) == 0:
            dict_accounts = []
        elif self.accounts:
            dict_accounts = [account.serializebyUser() for account in self.accounts]
        return {
            "userID": self.id,
            "firstname": self.firstname,
            "lastName": self.lastName,
            "email": self.email,
            "is_Active": self.is_Active,
            "usercode": self.firstname[0] + self.lastName + str(self.id),
            "accounts": dict_accounts
            # do not serialize the password, its a security breach
        }

class CryptoCoins(db.Model):
    __tablename__ = "coins"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    symbol = db.Column(db.String(120), unique=True, nullable=False)
    rank = db.Column(db.Integer, unique=False, nullable=False)
    accounts = db.relationship('Account',backref='coin')
    
    def __init__(self, name, symbol, rank):
        self.name = name,
        self.symbol = symbol
        self.rank = rank

    def __repr__(self):
        return '<CryptoCoins %r>' % self.name

    def serialize(self):
        return {
            "coinID": self.id,
            "name": self.name,
            "symbol": self.symbol,
            "rank": self.rank
            # do not serialize the password, its a security breach
        }


class Account(db.Model):
    __tablename__ = "accounts"
    id = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.id'))
    coinID = db.Column(db.Integer, db.ForeignKey('coins.id'))
    balance = db.Column(db.Float,unique=False, nullable=False)
    transactions = db.relationship('CryptoTransaction',backref='account')

    def __repr__(self):
        return '<Account %r>' % self.userID

    def __init__(self,userID, coinID, amount):
        self.userID = userID,
        self.coinID = coinID,
        self.balance = amount
        
    def Deposit(self, amount):
        self.balance = self.balance + amount

    def serializebyUser(self):
        if self.coin:
            dict_coin = self.coin.serialize()
        return {
            "accountID": self.id,
            "coinID": self.coinID,
            "balance": self.balance,
            "coin": dict_coin
            # do not serialize the password, its a security breach
        }

    def serializebyCoin(self):        
        return {
            "id": self.id,
            "userID": self.userID,
            "balance": self.balance,
            # do not serialize the password, its a security breach
        }

class CryptoTransaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime,unique=False, nullable=False)
    fromID = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    toID = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    accountID = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable = false)
    amount = db.Column(db.Float,unique=True, nullable=False)

    def __repr__(self):
        return '<CryptoTransaction %r>' % self.accountID

    def __init__(self, date, fromID, toID, accountID, amount):
        self.date = date,
        self.fromID = fromID,
        self.toID = toID,
        self.accountID = accountID,
        self.amount = amount
    
    def serialize(self):
        dic_from_user = self.from_user.serializeName()
        dic_to_user = self.to_user.serializeName()
        return {
            "date": self.date,
            "amount": self.amount,
            "from":dic_user,
            "to":dic_to_user
        } 