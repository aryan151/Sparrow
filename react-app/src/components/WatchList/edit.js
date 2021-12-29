import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';  
import { deleteListSymbol } from "../../store/watchLists";  
import { updateuserList, deleteUserList } from "../../store/watchLists";  
import { MdDeleteOutline } from 'react-icons/md'; 
import Main from "../SingleStock/StockChart/main";     

function Edit({list, setShowModal}) {  
    const dispatch = useDispatch()   
}