from flask import Blueprint, jsonify, request
from app.models import db, Asset

asset_routes = Blueprint('assets', __name__)

@asset_routes.route('/<int:asset_id>/', methods=["GET", "PATCH", "DELETE"])
def asset_get_post(asset_id):
    if request.method == 'GET':
        asset = Asset.query.get(asset_id)
        return asset.to_dict()

    elif request.method == 'PATCH':
        body = request.json
        asset = Asset.query.get(asset_id)
        asset.shares = body['shares']
        asset.average = body['average']
        db.session.commit()
        return asset.to_dict()

    elif request.method == 'DELETE':
        asset = Asset.query.get(asset_id)
        db.session.delete(asset)
        db.session.commit()
        return 'ok'


@asset_routes.route('/', methods=["POST"])
def asset_post():

    body = request.json
    asset = Asset(
        user_id=body['user_id'],
        ticker=body['ticker'],
        shares=body['shares'],
        average=body['average'] 
    )
    
    db.session.add(asset)
    db.session.commit()
    return asset.to_dict()