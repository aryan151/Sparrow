const SET_STOCKS = 'allStocks/SET_STOCKS';


const setStocksAction = (allStocks) => ({
  type: SET_STOCKS,  
  payload: allStocks
});

export const fetchAllStocks = () => async (dispatch) => {
  const allStocks = await fetch('/api/stocks/');
  const stocks = await allStocks.json();
  dispatch(setStocksAction(stocks));
};

const initialState = [];    

const stocksReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_STOCKS:
            newState = [...action.payload.allStocks];
            return newState;
        default:
            return state;
    };
};

export default stocksReducer;