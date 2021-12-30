from flask import Blueprint, jsonify, request
from app.models import db, Watchlist, WatchlistTicker

watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route('/<int:id>/', methods=['PATCH', 'DELETE'])
def watchlists(id):
    if request.method == 'PATCH':
        body = request.json
        current_list = Watchlist.query.get(id)
        current_list.watchlist_name = body['watchlist_name']  
        db.session.commit()
        return current_list.to_dict()
    if request.method == 'DELETE':  
        current_list = Watchlist.query.get(id)
        db.session.delete(current_list)
        db.session.commit()
        return 'ok'  

@watchlist_routes.route('/<int:id>/watchlist_ticker/', methods=['POST'])  
def watchlist_ticker(id):  
    body = request.json
    currentticker = WatchlistTicker(
        watchlist_id = id,
        ticker = body["ticker"]  
    )  
    db.session.add(currentticker)  
    db.session.commit()
    return currentticker.to_dict()  


@watchlist_routes.route('/new/<int:user_id>', methods=['POST'])
def new_watchlist(user_id):
    data = request.json

    watchlist = Watchlist(watchlist_name=data['name'], user_id=data['user_id'])      
    db.session.add(watchlist)
    db.session.commit()

    return {'msg': 'ok'}