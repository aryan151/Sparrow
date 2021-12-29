import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Main from "../SingleStock/StockChart/main";  
  
function ItemData({ticker, isStocks, listId, id}){    
    const graphData = useSelector(state => state?.watchlistStocks[ticker])      
    
 
    let isPos = graphData?.[graphData.length - 1]["%"][0] === "+" ? "pos" : "neg";

    return (
        <>  
            {graphData &&    
            <div className='delete-container'>
                <Link to={`/stocks/${ticker}`}>
                    <div className="list-stock-wrapper">  
                        <p>{ticker}</p>
                        <Main graphData={graphData} isWatchList={true} isPos={isPos}/>
                        <div className="list-price">
                            <p>{`$${graphData[graphData.length - 1].price}`}</p>
                            <p className={`${isPos}`}>{`${graphData[graphData.length - 1][`%`]}%`}</p>
                        </div>
                    </div>
                </Link>
            </div> 
            }
        </>
    );
};

export default ItemData 