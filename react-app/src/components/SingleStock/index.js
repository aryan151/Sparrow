import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function SingleStock () {
    const {ticker} = useParams() 
    return (
        <div>
        <p> single stock</p>   
        <p>{ticker}</p>
        </div>
    )
}

export default SingleStock