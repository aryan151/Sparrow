import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";      
import { useParams } from 'react-router-dom'
import {setCurrentStock} from '../../store/currentStock'



function SingleStock () {
    const dispatch = useDispatch()  
    const {ticker} = useParams() 

    const [resolution, setResolution] = useState('D');

    useEffect(()=>{
        (async ()=>{
          await dispatch(setCurrentStock(ticker, resolution))
        })()
      },[resolution, ticker])  


    return (
        <div>
        <p> single stock</p>   
        <p>{ticker}</p>  
        </div>
    )
}

export default SingleStock