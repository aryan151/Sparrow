import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"     
import { addListSymbol, adduserList, setUserLists } from "../../../store/watchLists"  
import { AiOutlineClose, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
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


    return (
        <div>  
            <p> add</p> 
        </div>
)
}

export default AddStock  