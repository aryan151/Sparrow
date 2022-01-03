import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {addUserList} from '../../store/watchLists'
import { setUserAssets } from '../../store/userAssets';  
import { setGeneralStories } from '../../store/currentStories'    
import { newUserList, setUserLists } from '../../store/watchLists';   
import Main from '../SingleStock/StockChart/main';      
import Resolution from '../SingleStock/ChartSize';    
import ReactLoading from 'react-loading'
import StockList from '../WatchList/stocklist';  
import AllList from '../WatchList/alllists';
import Stories from './Stories/stories' 
import { AiOutlinePlus } from 'react-icons/ai' 
import './dash.css'  


function Dash () {
    const dispatch = useDispatch();
    const history = useHistory() 
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
            <div className="topwelcome">{`Welcome, ${user.firstName} ${user.lastName}`}</div>
            <div className="topwelcome2">{'Current Portfolio:'}</div>
            {graphData ? <Main graphData={graphData} isPos={isPos}/> : <ReactLoading type={"spin"} color={'var(--clr-secondary)'} height={"20%"} width={"20%"} />}
            <Resolution resolution={resolution} setResolution={setResolution} isPos={isPos}/> 
            <div className="buying_power_container">
              <div className="buying_power_label_container">
                <h4 className="buying_power_label">Buying Power</h4>
              </div>
              <div className="buying_power">
                <h4 className="buying_power_label">
                  {`$${user.buyingPower.toLocaleString()}`}
                </h4>
              </div>
            </div>
            <div className="add_funds_container" onClick={() => history.push('/account')}>
              <div className="add_funds_label_container">
                <h5 className="add_funds_label">Fund Your Account</h5>
              </div>
              <div className="add_funds_description">
                <p className="funds_description">
                  Your account is ready! Click Here to fund your account and start trading.
                </p>
              </div>
            </div>
            <Stories stories={stories}/>  
            </div>
            <div className={`watchlist-container`}>  
            <StockList isPos={isPos}/>   
                <div className={`watchlist-header`} >  
                    <h2 className={`watchlist-title`}>Lists</h2>
                    <AiOutlinePlus className={`newlistbutton`} onClick={() => setShowNewList(true)} />
                </div> 
                {showNewList && (
                    <div className='newlistdrop'>   
                        <input className='inputnewlist' type="text" placeholder="List Name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
                        <div className='addlistbtns'>
                            <button className='addlistedit' onClick={createNewList}>Create WatchList</button>  
                            <button className='addlistcancel' onClick={() => setShowNewList(false)}>Cancel</button>
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