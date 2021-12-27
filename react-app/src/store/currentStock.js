import { singleAssetGraphData, getGraphDate } from "./stockApiInfo";  



const SET_CURRENT_STOCK = 'currentStock/SET_CURRENT_STOCK';
const SET_CURRENT_PRICE = 'currentStock/SET_CURRENT_PRICE';


const setCurrentPriceAction = (data) => {
    return {
        type: SET_CURRENT_PRICE,
        data
    };
};

const setCurrentStockAction = (data) => {
    return {
        type: SET_CURRENT_STOCK,
        data
    };
};


export const setCurrentStock = (symbol, res) => async (dispatch) => {

    const companyInfoRes = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=8LEC74LW0G7TOUQM`);
    const companyStatsRes = await fetch(`https://finnhub.io/api/v1//quote?symbol=${symbol}&token=c5f2bi2ad3ib660qt670`);
    const companyInfo = await companyInfoRes.json();
    const companyStats = await companyStatsRes.json();

    let graphData = await singleAssetGraphData(res, symbol);

    let stockInfo, stockStats, currentPrice = {}

    if (graphData) {
        stockInfo = {
            name: companyInfo.Name,
            description: companyInfo.Description,
            HQ: companyInfo.Address,
            sector: companyInfo.Sector
        };
    
        stockStats = {
            marketCap: Number(companyInfo.MarketCapitalization),
            PERatio: Number(companyInfo.PERatio),
            dividendYield: Number(companyInfo.DividendYield),
            '52weekHigh': Number(companyInfo['52WeekHigh']),
            '52weekLow': Number(companyInfo['52WeekLow']),
            highToday: companyStats.h,
            lowToday: companyStats.l,
            openPrice: companyStats.o,
            previousClose: companyStats.pc
        };
    
        currentPrice = {
            price: companyStats.c,
            time: getGraphDate(companyStats.t, '30'),
            '%': companyStats.dp,
        };
    
        dispatch(setCurrentStockAction({graphData, stockInfo, stockStats, currentPrice}));
    } else {
        return
    }
};

export const getCurrentPrice = (symbol) => async (dispatch) => {
    const companyStatsRes = await fetch(`https://finnhub.io/api/v1//quote?symbol=${symbol}&token=c5f2bi2ad3ib660qt670`);
    const companyStats = await companyStatsRes.json();
    let currentPrice = {
        price: companyStats.c,
        time: getGraphDate(companyStats.t, '30'),
        '%': companyStats.dp,
    };
    dispatch(setCurrentPriceAction(currentPrice));
};


const initialState = {
    graphData: null,
    stockInfo: null,
    stockStats: null,
    currentPrice: null,
}

const currentStockReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_CURRENT_STOCK:
            newState = {...action.data}
            return newState; 
        case SET_CURRENT_PRICE:
            newState = {...state}
            newState.currentPrice = action.data
            return newState
        default:
            return state;
    };
};

export default currentStockReducer;    