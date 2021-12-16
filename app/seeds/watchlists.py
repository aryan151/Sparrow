from app.models import db, Watchlist
 
def seed_watchlists():
    list_one = Watchlist(user_id = 1, watchlist_name = "To Buy")   


    db.session.add(list_one)  


    db.session.commit()    


def undo_watchlists():
    db.session.execute("TRUNCATE watchlists RESTART IDENTITY CASCADE;")
    db.session.commit()     