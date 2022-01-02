import { useDispatch } from "react-redux";
import { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import { setWatchListStocks } from "../../store/watchlistStocks"; 
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'  
import Edit from "./edit"; 
import {Modal} from '../../context/Modal'    
import {BiDotsHorizontal} from 'react-icons/bi'     
import ItemData from "./itemchart";

function Item ({list, listName=false , isStocks=false, isPos, userId}){  
    const dispatch = useDispatch();    
    const [showList, setShowList] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const refListLength = Object.keys(list?.tickers).length  
    
    let tickers = Object.keys(list?.tickers);  
    
  
    useEffect(() => {
     
            dispatch(setWatchListStocks(tickers))
      
    },[dispatch, tickers])        
   
    
    return (  
      <>
        <div className={`${listName ? 'stock-title' : `list-title-edit`}`}>  
          <h1>{listName ? listName : list.watchlistName}</h1>   
          <div className="list-settings">
              {!isStocks && <BiDotsHorizontal onClick={() => setShowModal(!showModal)} className={`${isPos}-menu`}/>}
              {showList ? <IoIosArrowUp onClick={() => refListLength ? setShowList(!showList) : null} id="up" className={`${isPos}-arrow`} /> : <IoIosArrowDown onClick={() => refListLength ? setShowList(!showList) : null} id="down" className={`${isPos}-arrow`}/>}
          </div>  
        </div>  
        {showModal && (
          <Modal onClose={() => setShowModal(false)} isWatchList={true}>
            <Edit setShowModal={setShowModal} list={list} userId={userId}/>   
          </Modal>
        )}
        {showList && (
          <>
                   
            {tickers &&
              tickers.map((ticker) => (    
                
                <ItemData  
                  ticker={ticker} 
                /> 

              ))}
          </>
        )}
      </>
    );



}

export default Item 