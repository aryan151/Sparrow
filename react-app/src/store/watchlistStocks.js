import { singleAssetGraphData } from "./stockApiInfo"; 

const SET_WATCHLIST_STOCKS = "watchlistStocks/SET_WATCHLIST_STOCKS";


const setWatchListAction = (stocks) => {
  return {
    type: SET_WATCHLIST_STOCKS,
    stocks,
  };
};


  
export const setWatchListStocks = (tickers) => async (dispatch) => {
  let stockInfo = {};
  let error = false
  for (let i = 0; i < tickers.length; i++) {
    let ticker = tickers[i];   
    const stockData = await singleAssetGraphData("D", ticker);  
  
    if (stockData) {
      stockInfo[ticker] = stockData  
    } else {
      error = true
    }
  }
  if (error) {
    return 
  } else {
    dispatch(setWatchListAction(stockInfo));
  }
};


const initialState = {};

const watchlistStocksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_WATCHLIST_STOCKS:
      newState = {...state, ...action.stocks}
      return newState;
    default:
      return state;
  }
};

export default watchlistStocksReducer;