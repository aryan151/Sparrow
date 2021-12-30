import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {addUserList} from '../../store/watchLists'
import { setUserAssets } from '../../store/userAssets';  
import { setGeneralStories } from '../../store/currentStories'    
import { newUserList, setUserLists } from '../../store/watchLists';  
import Watchlist from '../WatchList';  
import Main from '../SingleStock/StockChart/main';      
import Resolution from '../SingleStock/ChartSize';    
import ReactLoading from 'react-loading'
import StockList from '../WatchList/stocklist';  
import AllList from '../WatchList/alllists';
import Stories from '../Dashboard/Stories/stories' 
import { AiOutlinePlus } from 'react-icons/ai' 
import './dash.css'  


function Dash () {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);          
    const stories = useSelector(state => state.stories); 
    const graphData = useSelector(state => state?.userAssets?.graphData)  
    let isPos = graphData?.[graphData.length - 1]['%'][0] === '+' ? 'pos' : 'neg'  
    const [resolution, setResolution] = useState('D')  
    const [showNewList, setShowNewList] = useState(false)  
    const [newListName, setNewListName] = useState('')     

    function createNewList() {  
        const list = { user_id: user.id, watchlist_name: newListName } 
        dispatch(addUserList(list, user.id))  
        setNewListName('')  
        setShowNewList(false)  
    }

    useEffect(() => {
        (async () => {
            await dispatch(setGeneralStories())
        })()
    }, [dispatch]); 
 
    useEffect(() => {
        (async () => {
            await dispatch(setUserAssets(user.id, resolution))     
        })()
    }, [dispatch, resolution]);
    
    return (
    <div className={`main-body`}>  
        
        <div className='main-wrapper'>  
            <div className={`main-content`}> 
            {graphData ? <Main graphData={graphData} isPos={isPos}/> : <ReactLoading type={"spin"} color={'var(--clr-secondary)'} height={"20%"} width={"20%"} />}
            <Resolution resolution={resolution} setResolution={setResolution} isPos={isPos}/> 
            <p> Buying Power: <span>{user.buyingPower}</span></p>
            <Stories stories={stories}/>  
            </div>
            <div className={`watchlist-container`}>  
            <StockList isPos={isPos}/>   
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
                <AllList/> 
            </div>
        </div>
    </div>
    );
}

export default Dash