import { useDispatch } from "react-redux";
import { useEffect, useState } from "react"; 
import { setWatchListStocks } from "../../store/watchlistStocks"; 
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'   
import {BiDotsHorizontal} from 'react-icons/bi'     
import ItemData from "./itemchart";

function Item ({list, listName=false , isStocks=false, isPos}){ 
    const dispatch = useDispatch();
    
    const [showList, setShowList] = useState(true)
    const refListLength = Object.keys(list?.tickers).length

    let tickers = Object.keys(list?.tickers);  

    useEffect(() => {
        (async () => {    
           await dispatch(setWatchListStocks(tickers))
        })();
    },[dispatch, tickers])        



    return (
      <>
        <div className={`${listName ? 'stock-title' : `list-title-edit`}`}>
          <h1>{listName ? listName : list.listName}</h1>
          <div className="list-settings">
              {showList ? <IoIosArrowUp onClick={() => refListLength ? setShowList(!showList) : null} id="up" className={`${isPos}-arrow`} /> : <IoIosArrowDown onClick={() => refListLength ? setShowList(!showList) : null} id="down" className={`${isPos}-arrow`}/>}
          </div>
        </div>  
        {showList && (
          <>
          {console.log(tickers)}         
            {tickers &&
              tickers.map((ticker) => (    
                <ItemData  
                  ticker={ticker}
                  isStocks={isStocks}
                  listId={list?.tickers[ticker]?.listId}
                  id={list?.tickers[ticker]?.id}   
                />
              ))}
          </>
        )}
      </>
    );



}

export default Item 