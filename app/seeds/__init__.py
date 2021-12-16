from flask.cli import AppGroup
from .users import seed_users, undo_users
from .watchlists import seed_watchlists, undo_watchlists
from .watchlist_tickers import seed_watchlist_tickers, undo_watchlist_tickers
from .stocks import seed_stocks, undo_stocks


# Creates a seed group to hold our commands
# So we can type `flask seed --help`  
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_stocks() 
    seed_watchlists()
    seed_watchlist_tickers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_stocks() 
    undo_watchlists() 
    undo_watchlist_tickers() 
    # Add other undo functions here
