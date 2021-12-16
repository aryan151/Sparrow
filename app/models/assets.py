from .db import db


class Asset(db.Model):
    __tablename__ = 'assets' 

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    symbol = db.Column(db.String(10), nullable=False)
    shares = db.Column(db.Float, nullable=False)
    average = db.Column(db.Float, nullable=False)

    user = db.relationship('User', back_populates='assets')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'symbol': self.symbol,
            'shares': self.shares,
            'average': self.average
        }