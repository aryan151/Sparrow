import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"     
import { addListSymbol, addUserList, setUserLists } from "../../../store/watchLists"  
import { AiOutlineClose } from "react-icons/ai";  
import {Modal} from '../../../context/Modal'    



function AddStock ({ticker, userId, isPos, stockName}){  
    const dispatch = useDispatch()
    const lists = useSelector(state => state.watchLists)

    const [openLists, setOpenLists] = useState(false)
    const [showNewList, setShowNewList] = useState(false)
    const [newListName, setNewListName] = useState('')


    useEffect(() => {
        dispatch(setUserLists(userId)) 
    },[dispatch])

    function isInList(list){
        
        return list.tickers[ticker] ? true : false  
    }   

    function handleSubmit(){
        const listInputs = document.querySelectorAll(".listInputs")
        const checkedInputs = Array.from(listInputs).filter(list => list.checked)

        for(let i = 0; i < checkedInputs.length; i++){
            const input = checkedInputs[i]
            const listId = Number(input.attributes.id.value.split("-")[1])  
            dispatch(addListSymbol(listId, ticker))
        }
        dispatch(setUserLists(userId)) 
        setOpenLists(!openLists)
    }

    function handleNewList(){
        const list = { user_id: userId, watchlist_name: newListName } 
        dispatch(addUserList(list, userId))  
        setNewListName('')
        setShowNewList(false)
    }


    
       return (
        <div className="atl-wrapper">
            <button
            className={`${isPos}-atl-button`}
            onClick={() => setOpenLists(!openLists)} 
            >
                Add to Lists
            </button>

            {openLists && (
            <Modal onClose={() => setOpenLists(false)} isWatchList={false}>  
                <div className="atl-modal-wrapper">
                <div className="atl-title">
                    <p>Add {ticker} to Your Lists</p>  
                </div>
                {showNewList ? (
                    <div className='atl-input-wrapper'>
                    <input
                        type="text"
                        placeholder="List Name"
                        value={newListName}
                        className={`${isPos}-edit-input`}
                        onChange={(e) => setNewListName(e.target.value)}
                    />
                    <div className='list-name-update-button-container'>
                        <button className={`${isPos}-atl-list-create-btn`} onClick={handleNewList}>Create List</button>
                        <button className={`${isPos}-atl-list-cancel-btn`} onClick={() => setShowNewList(false)}>
                        Cancel
                        </button>
                    </div>
                    </div>
                ) : (
                    <div className="new-list" onClick={() => setShowNewList(true)}>
                    <div>  
                        <p className="atl-list-names new-list-pointer">Create New List</p>
                    </div>
                    </div>
                )}  
                {Object.keys(lists).map((key) => (
                    <div className="atl-watchlist-wrapper">
                    <label
                        htmlFor={`list-${lists[key].id}`}
                        className={`${isPos}-atl-label`}
                    >
                        <input
                        className="listInputs"
                        id={`list-${lists[key].id}`}
                        type="checkbox"
                        disabled={isInList(lists[key]) ? true : false}
                        />
                        <span className={`${isPos}2 checkmark`}></span>
                    </label>
                    <div className="atl-watchlist-info">
                        <div className="atl-watchlist-stats">
                        <p className="atl-list-names1">{lists[key].watchlistName}</p>  
                        <div className="atl-watchlist-stats-btm">
                            <p>{Object.keys(lists[key].tickers).length} items</p>   
                            <p className="atl-in-list">
                            {isInList(lists[key]) ? "Already in list" : ""}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                <button className={`${isPos}-atl-save-btn`} onClick={handleSubmit}>Save Changes</button>
                </div>
            </Modal>    
            )}
      </div>
    );

}

export default AddStock  