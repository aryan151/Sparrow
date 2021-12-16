from .db import db

class Watchlist(db.Model):  
    __tablename__ = "watchlists" 

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    watchlist_name = db.Column(db.String(50), nullable=False)
    
    watchlist_ticker = db.relationship('WatchlistTicker', back_populates = 'watchlist', cascade = 'all, delete')
    user = db.relationship('User', back_populates = 'watchlists')

    def to_dict(self):
        return {  
            'id': self.id,  
            'userId': self.user_id,
            'watchlistName': self.watchlist_name,    
            'tickers': {ticker.to_dict()['ticker']: ticker.to_dict() for ticker in self.watchlist_ticker}
        }