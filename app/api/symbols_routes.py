from flask import Blueprint, jsonify, request
from app.models import db, Watchlist, WatchlistTicker  

symbols_routes = Blueprint('symbols', __name__)

@symbols_routes.route('/<int:id>/', methods=['DELETE'])  
def delete_list_symbol(id):  
    current_list_symbol = WatchlistTicker.query.get(id)
    db.session.delete(current_list_symbol)     
    db.session.commit()
    return 'ok'
    