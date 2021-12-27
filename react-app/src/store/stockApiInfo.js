
//Function A: 
//Finnhub.io API gives Time(from & to) via UNIX timestamps 
//Returns workable timestamps that can be easier used in JS for graph    
export function getGraphDate(unix, resolution) {
    const dateArr = new Date(unix * 1000).toLocaleString().split(' ');
    const amOrPm = dateArr[dateArr.length - 1]
    const [ hours, minutes ] = dateArr[1].split(':')
    const [ month, day, year ] = dateArr[0].split('/')
    if (resolution === '5') return `${hours}:${minutes}${amOrPm}`
    if (resolution === 'M') return `${month}/${year}`
    return `${month}/${day}`
}

//Function B:
//Finnhub.io bugs out when trying to retrive real time stock info on weekend (market is closed)
//Check the current date & Returns the latest date the market was updated if weekend 

const newDateNoWeekend = () => {
    let ref = new Date()
    let currentDate;
    switch (ref.getDay()) {
        case 6:
            currentDate = new Date(ref.setDate(ref.getDate() - 1))
            break;
        case 0:
            currentDate = new Date(ref.setDate(ref.getDate() - 2))
            break;
        default:
            currentDate = ref
            break;
    }
    return currentDate
}
//Function C: 
//Returns a workable timestamp for current datetime for graphs     
const getCurrentDate = () => {
    let checkWeekend = newDateNoWeekend()
    const currentDate = +new Date(checkWeekend)
    return Number(currentDate.toString().slice(0, 10))
}

//Function D: 
//Returns a timestamp for resolution of graph (Day, Week, Month, Year)
const getFromDate = (timeFrame) => {
    let checkWeekend = newDateNoWeekend()
    const currentDate = new Date(checkWeekend);
    let newDate;

    switch (timeFrame) {
        case 'D':
            newDate = currentDate
            break;
        case 'W':
            newDate = new Date(currentDate.setDate(currentDate.getDate() - 7))
            break;
        case 'M':
            newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            break;
        case 'Y':
            newDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
            break;
        default:
            return null;
    }

    let month = newDate.getMonth() + 1
    let day = newDate.getDate()
    let year = newDate.getFullYear()
    let res = +new Date(`${month} ${day}, ${year} 06:30:00`)
    return Number(res.toString().slice(0, 10))
}

//Function E:   
// Returns an object with all of the information needed to query the API, depending on how long in the past they want to see,    
// Uses Function C & D to get exact dates witin selected timeframe      
export const getQueryParameters = (timeFrame) => {
    let timeFrameTranslate = { 'D': '5', 'W': '60', 'M': 'D', 'Y': 'M' }
    return {
        resolution: timeFrameTranslate[timeFrame],
        fromDate: getFromDate(timeFrame),
        currentDate: getCurrentDate()
    }
}

//Function F: 
// Returns the percentage difference between the first data point price compared to every other data point.       
const percentageDifference = (stockData) => {
    if (stockData.length > 0) {
        const originalNumber = stockData[0].price
        const latestNumber = stockData[stockData.length - 1].price
        const percentageDiff = (latestNumber - originalNumber) / originalNumber * 100
        if (!percentageDiff.toString().startsWith("-")){

            return "+" + Number(percentageDiff.toFixed(2));
        }else{
            return Number(percentageDiff.toFixed(2));
        }
    }
    return 0
}

// Function G: 
//Rotate API keys to prevent lag/breaks due to constant pulling of data   
const API_KEYS = [
    'c5f2bi2ad3ib660qt670',
    'c66p2mqad3icr57jl0ag',
    'c66p2vaad3icr57jl0g0',
    'c66p352ad3icr57jl0kg',
    'c66p462ad3icr57jl130',
    'c5fm5piad3i9cg8u5dk0'
]

let keyCount = 0

const getKey = () => {
    const key = API_KEYS[keyCount]
    keyCount === 5 ? keyCount = 0 : keyCount += 1
    return key
}

// Function H:
// Finhub.io api method to get candle of one stock (graph info) 
const fetchSingleStockCandles = async (symbol, resolution, fromDate, currentDate) => {
    let response = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${+fromDate}&to=${+currentDate}&token=${getKey()}`
    )
    let data = await response.json();
    if (data.error) return false;
    let res = { prices: data.o, times: data.t, resolution }
    return res
}

//Function I: 
// Returns additional infromation regarding stock price & difference over time within resolution 
const single_asset_graph_points = (graphData) => {
    const { prices, times, resolution } = graphData
    if (prices && times) {
        const stockData = []
        for (let i = 0; i < prices.length; i++) {
            let price = Number(prices[i].toFixed(2))
            let time = getGraphDate(times[i], resolution)
            stockData.push({ time, price })
            stockData[i]['%'] = percentageDifference(stockData)
        }
        return stockData
    }
    return false
}



// Function J:   
// main fetch function for portfolio graph, loops through all symbols given, fetches info for each of them, adds api data into an object.
// afterwards, it loops through the object and crosschecks the user's assets and calculates at each time frame what their total value is.      
const fetchMultipleStocksCandles = async (symbols, resolution, fromDate, currentDate) => {
    const assetsCandleNums = {}
    let times;

    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i]

        let response = await fetch(
            `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${+fromDate}&to=${+currentDate}&token=c5f2bi2ad3ib660qt670`
        );

        let data = await response.json()
        if (data.error) return false
        assetsCandleNums[symbol] = data.o
        if (!times) times = data.t
        if (times.length > data.t.length) times = data.t
    }

    let res = { assetsCandleNums, times, resolution }
    return res
}

//Function K: 
//Obtains amount of shares the user has for specific assets & obtains total value of all share      
const user_assets_graph_points = (graphData, userAssets) => {
    const { assetsCandleNums, times, resolution } = graphData
    let len;

    if (Object.values(assetsCandleNums).length) {
        len = Object.values(assetsCandleNums).reduce((val, next) => {
            if (next.length < val.length) val = next;
            return val
        }).length
        const stockData = []
    
        for (let i = 0; i < len; i++) {
            let total = 0.00
            for (let asset in assetsCandleNums) {
                let shares = userAssets[asset].shares
                let worth = shares * assetsCandleNums[asset][i]
                total += worth
            }
            let priceAndTime = { time: getGraphDate(times[i], resolution), price: Number(total.toFixed(2)) }
            stockData.push(priceAndTime)
            stockData[i]['%'] = percentageDifference(stockData)
        }
    
        return stockData
    }
    return false
}





// Function L: 
// Returns finhub.io graph data for multiple stocks at once     

export async function multiAssetGraphData(selectedResolution, symbols, userAssets){
    const { resolution, fromDate, currentDate } = getQueryParameters(selectedResolution)
    let data = await fetchMultipleStocksCandles(symbols, resolution, fromDate, currentDate)
    if (data) {
        let stockData = user_assets_graph_points(data, userAssets)
        return stockData
    }
    return false
}



// Function M:
// Returns data for single graph points 
export async function singleAssetGraphData(selectedResolution, symbol){
    const { resolution, fromDate, currentDate } = getQueryParameters(selectedResolution)
    let data = await fetchSingleStockCandles(symbol, resolution, fromDate, currentDate)
    if (data) {
        let stockData = single_asset_graph_points(data)
        return stockData
    }
    return false
}




// Function N: 
// Custom helper function for data handeling   
export function CustomToolTip({active, payload, label}) {
    return (
    <div className="tooltip">
      <h4>{label}</h4>
    </div>
    )
}