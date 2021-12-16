from app.models import db, Asset


def seed_assets():
     
    asset1 = Asset(
        user_id=1,
        ticker='APPL',
        shares=100,
        average=100,
    )
    asset2 = Asset(
        user_id=1,
        ticker='FB',
        shares=100,  
        average=100,
    )

    db.session.add(asset1)
    db.session.add(asset2)
    db.session.commit()  


def undo_assets():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()