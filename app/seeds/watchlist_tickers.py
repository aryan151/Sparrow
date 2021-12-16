from app.models import db, WatchlistTicker


# Adds a demo user, you can add other users here if you want  
def seed_watchlist_tickers():
    seed1 = WatchlistTicker(watchlist_id=1, ticker='AAPL')
    seed2 = WatchlistTicker(watchlist_id=1, ticker='FB')
    seed3 = WatchlistTicker(watchlist_id=1, ticker='TSLA')  


    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)          
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.  
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlist_tickers():
    db.session.execute('TRUNCATE watchlist_tickers RESTART IDENTITY CASCADE;')
    db.session.commit()    