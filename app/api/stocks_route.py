from flask import Blueprint, jsonify
from app.models import Stock

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/')
def stocks():
    stocks = Stock.query.all()
    return {'allStocks': [stock.to_dict() for stock in stocks]} 