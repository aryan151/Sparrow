from sqlalchemy.orm import defaultload
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin): 
    __tablename__ = 'users'  

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(75), nullable=False )
    last_name = db.Column(db.String(75), nullable=False )   
    buying_power = db.Column(db.Float, nullable=False, default = 0)    
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    watchlists = db.relationship('Watchlist', back_populates='user')
    assets = db.relationship('Asset', back_populates='user')
    @property
    def password(self):
        return self.hashed_password 

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'buyingPower': self.buying_power,     
            'email': self.email
        }
