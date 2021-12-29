import { useSelector } from 'react-redux'; 
import Item from './item' 
  
function StockList({isPos}) {  

    const assets = useSelector(state => state?.userAssets)   
    const listKeys = Object.keys(assets)  
    let tickers = {}
    let hack = ['1']
    listKeys.slice(0, listKeys.length -1).forEach(ticker => {
        tickers[ticker] = ticker
    }) 
    
    return ( 
        <>
            {hack && hack.map(key => (       
                <Item list={{'tickers': tickers}} listName={'Stocks'} isStocks={true} isPos={isPos}/>
              
            ))}
        </>
    );
};

export default StockList;

