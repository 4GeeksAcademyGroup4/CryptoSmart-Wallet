  
import os
from flask_admin import Admin
from .models import db, CryptoUser, CryptoCoins, Account, CryptoTransaction
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    # admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(CryptoUser, db.session))
    admin.add_view(ModelView(CryptoCoins, db.session))
    admin.add_view(ModelView(Account, db.session))
    admin.add_view(ModelView(CryptoTransaction, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))