from .db import db

class WatchlistTicker(db.Model):  
    __tablename__ = 'watchlist_ticker'    

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey('watchlists.id'), nullable=False)
    ticker = db.Column(db.String(50), nullable=False)

    # relationship with List model
    watchlist = db.relationship('Watchlist', back_populates='watchlist_ticker')

    def to_dict(self):
        return {
            'id' : self.id,
            'watchlistId' : self.watchlist_id,
            'ticker' : self.ticker
        }  