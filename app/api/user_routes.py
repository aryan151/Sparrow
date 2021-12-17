from flask import Blueprint, jsonify, request 
from flask_login import login_required
from app.models import User, db, Watchlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()  
    
@user_routes.route('/<int:id>/buying_power/', methods=["PATCH"])
def update_buying_power(id):
    body = request.json
    user = User.query.get(id)
    user.buying_power = body
    db.session.commit()
    return 'ok'