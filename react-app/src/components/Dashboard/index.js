import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {addUserList} from '../../store/watchLists'
import Watchlist from '../WatchList';  
import { AiOutlinePlus } from 'react-icons/ai' 
function Dash () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session);

    const [showNewList, setShowNewList] = useState(false)
    const [newListName, setNewListName] = useState('')   

    function createNewList() {
        dispatch(addUserList({
            user_id: user.id,
            watchlist_name: newListName
        }))
        setNewListName('')
        setShowNewList(false)
    }

    return (
    <div className={`main-body`}>
        <div className='main-wrapper'>
            <div className={`main-content`}>
            <p>Graph </p>
            <p>Toggle</p>
            <p>Buying Power</p> 
            <p>Stories</p> 
            </div>
            <div className={`watchlist-container`}>
                <div className={`watchlist-header`} >
                    <h2 className={`watchlist-title`}>Lists</h2>
                    <AiOutlinePlus className={`-new-watchlist-button`} onClick={() => setShowNewList(true)} />
                </div>
                {showNewList && (
                    <div className={`new-list-container`}>   
                        <input className={`-new-list-input`} type="text" placeholder="List Name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
                        <div className={`new-list-buttons`}>
                            <button className={`new-list-edit`} onClick={createNewList}>Create WatchList</button>  
                            <button className={`new-list-cancel`} onClick={() => setShowNewList(false)}>Cancel</button>
                        </div>
                    </div>

                )}
                <Watchlist/> 
            </div>
        </div>
    </div>
    );
}

export default Dash