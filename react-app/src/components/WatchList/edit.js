import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';  
import { deleteListSymbol } from "../../store/watchLists";  
import { updateUserList, deleteUserList, setUserLists } from "../../store/watchLists";       
import { MdOutlineCancel } from 'react-icons/md'; 
import { setWatchListStocks } from '../../store/watchlistStocks';
import Main from "../SingleStock/StockChart/main";     
    
function Edit({list, setShowModal, userId}) {        
    const dispatch = useDispatch()   
    const graphData = useSelector(state => state?.watchListStocks)    
    const userAssetsGraph = useSelector(state => state.userAssets.graphData)

    const overAllIsPos = userAssetsGraph?.[userAssetsGraph.length - 1]['%'][0] === '+' ? 'pos' : 'neg'

    const [newListTitle, setNewListTitle] = useState(list.watchlistName) 

    let tickers = Object.keys(list.tickers);      
  

    function handleTitleSave() {
        const updatedList = {
            id: list.id,
            watchlist_name: newListTitle     
        }
        dispatch(updateUserList(updatedList)) 
        setShowModal(false)    
    }  

    function handleListDelete() {
        dispatch(deleteUserList(list.id)).then(() => dispatch(setUserLists(userId))).then(() => setShowModal(false)) 
           

    }



    function isPos(ticker) {  
        let isPos = graphData?.[ticker][graphData[ticker].length - 1]["%"][0] === "+" ? "pos" : "neg";
        return isPos  
    }

    
    function handleDelete(ticker, listId, id) {  
        dispatch(deleteListSymbol({
            id,
            listId,
            ticker
        })).then(() => setShowModal(false))
        window.location.reload(false);
        
          
    }


    return (
          <div className={'temp'} >
           
            <div className='title-edit'>
                <div className='edit-list-title'>
                    <input
                        type="text"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        className={`${overAllIsPos}-edit-input`}
                    />
                </div>
                <button className={`${overAllIsPos}-save-button`} onClick={handleTitleSave}>Save</button>
            </div>
            <div className='edit-list-symbols' >  
                <p className='edit-symbols-title' >Stocks in this list</p> 
                {tickers &&
                    tickers.map((ticker) => (
                     
                        <div className='edit-list-symbol-info'>  
                            {(
                                <>
                                    <div className="edit-list-wrapper">
                                        <p className='edit-list-symbol'>{ticker}</p>  
                                        <div className='edit-graph'>
                                            <Main graphData={graphData[ticker]} isWatchList={true} isPos={isPos(ticker)} />
                                        </div>
                                        <p className='edit-list-price'>{`$${graphData?.[ticker]?.[graphData[ticker].length - 1]?.price}`}</p>
                                        <p className={`${isPos(ticker)} edit-list-percent`}>{`${graphData?.[ticker]?.[graphData[ticker]?.length - 1][`%`]}%`}</p>
                                        <MdOutlineCancel className={`${isPos(ticker)}-edit-list-symbol-delete`} onClick={() => handleDelete(ticker, list?.tickers[ticker]?.listId, list?.tickers[ticker]?.id)} />
                                    </div>    
                                </>
                            )}
                        </div>
                    ))}
            </div>
            <div className='edit-delete-and-cancel'> 
                <button className='edit-list-delete-button' onClick={handleListDelete}>Delete List</button>
            </div>
        </div>  
    )
}

export default Edit 