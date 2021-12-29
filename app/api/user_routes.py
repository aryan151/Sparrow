from flask import Blueprint, jsonify, request 
from flask_login import login_required
from app.models import User, db, Watchlist, Asset

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

@user_routes.route('/<int:id>/assets/')  
def get_all_assets(id):
    assets_from_db = Asset.query.filter(Asset.user_id == int(id)).all()  
    assets = { asset.to_dict()['ticker']: asset.to_dict() for asset in assets_from_db }
    return assets


@user_routes.route('/<int:id>/watchlists/', methods=['GET', 'POST'])
def watchlists(id):
    body = request.json
    if request.method == 'GET':  
        Watchlists = Watchlist.query.filter(Watchlist.user_id == id).all()
        return {Watchlist.to_dict()['id']: Watchlist.to_dict() for Watchlist in Watchlists}
    elif request.method == 'POST':
        body = request.json
        new_watchlist = Watchlist(user_id=id, watchlist_name=body["watchlist_name"])  
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()    

