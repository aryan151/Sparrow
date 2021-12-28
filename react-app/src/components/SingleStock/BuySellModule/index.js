import { useSelector, useDispatch } from "react-redux";
import { formatThousands } from "../StockStats/utils";
import { useState } from "react"; 
import { updateUserAsset, deleteUserAsset, addUserAsset } from "../../../store/userAssets"; 
import {editBuyingPower} from '../../../store/session'  

function BuyOrSell ({price, ticker, isPos}) {

    return (
        <div>
            {price}
        </div>
    )
}

export default BuyOrSell