import {editBuyingPower} from '../../store/session' 
import {useState, useSelector} from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import {formatThousands} from '../SingleStock/StockStats/utils'       

function AddFunds ({user}) {         
    const dispatch = useDispatch()  
    const [depositAmount, setDepositAmount] = useState('$0.00')
    const [error, setError] = useState(null)   
     


    function depositFunds(){
        if (depositAmount === "$0.00" || depositAmount === 0){
          setError("Amount Has To Be Greater than Zero")
        }else if(depositAmount > 1000000){
          setError("We Cannot Hold That Much Cash")    
        }else{
          const buyingPower = +user.buyingPower + +depositAmount
          setError(null)
          dispatch(editBuyingPower(user.id, buyingPower))
          setDepositAmount("$0.00")  
          window.location.reload(false)
        }
      }

    function preventLetters(e) {
        const charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);
  
        if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
      }


    return (
        <div> 
            <p> Add Funds</p>  
            {console.log(user.buyingPower)}  
            <p> {formatThousands(user.buyingPower)}</p>
            <div className="bp-input">
              <div className="amount-cont">
                <p>Amount</p>
                {error && <p className="amount-err">{error}</p>}
              </div>
              <input
                className={`-bp-input1`}
                type="number"
                placeholder="$0.00"
                onChange={(e) => setDepositAmount(e.target.value)}
                onKeyPress={(e) =>  preventLetters(e)}
                value={depositAmount}
              />
            </div>
            <button className={`-bp-button`} onClick={depositFunds}>
              Deposit Funds
            </button>
        </div>
    )
}

export default AddFunds