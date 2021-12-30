import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import stocksReducer from './stocks';  
import watchListsReducer from './watchLists';
import currentStockReducer from './currentStock';
import userAssetsReducer from './userAssets'
import watchlistStocksReducer from './watchlistStocks';
import currentStoriesReducer from './currentStories';

const rootReducer = combineReducers({
  session,
  allStocks: stocksReducer,
  watchLists: watchListsReducer,
  currentStock: currentStockReducer,
  userAssets: userAssetsReducer,
  watchListStocks: watchlistStocksReducer,
  stories: currentStoriesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
