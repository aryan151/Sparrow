import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';  
import { deleteListSymbol } from "../../store/watchLists";  
import { updateuserList, deleteUserList } from "../../store/watchLists";  
import { MdDeleteOutline } from 'react-icons/md'; 
import Main from "../SingleStock/StockChart/main";     

function Edit({list, setShowModal}) {  
    const dispatch = useDispatch()   
    const graphData = useSelector(state => state.watchlistStocks)
    const userAssetsGraph = useSelector(state => state.userAssets.graphData)

    const overAllIsPos = userAssetsGraph?.[userAssetsGraph.length - 1]['%'][0] === '+' ? 'pos' : 'neg'

    const [newListTitle, setNewListTitle] = useState(list.watchlistName)  
    let symbols = Object.keys(list.tickers);  

    return (
        <div>
            <p>TEXT HERE</p>
        </div>
    )
}

export default Edit 