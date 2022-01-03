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
        if (depositAmount === "$0.00" || depositAmount === +0){
          alert("Amount Has To Be Greater than Zero")
        }else if(depositAmount > 1000000){
          alert("We Cannot Hold That Much Cash")      
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
            <div className="accountlowwrapper">
                <div className="accountlowcontainer">
                    <div className="accounttitlecon">
                        <h3 className="accounttitle">Available Cash</h3>
                    </div>
                    <div className="accountpart1cont">  
                        <p className="accountpart2cont">Current Balance</p>
                        <p className="accountpart3cont">${formatThousands(user.buyingPower)}</p>  
                    </div> 
                    <div className="accountpart1cont">   
                        <p className="accountpart2cont">Deposit Funds</p>
                        <input className="accountpart3cont" 
                            type="number"
                            placeholder="$0.00"
                            onChange={(e) => setDepositAmount(e.target.value)}
                            onKeyPress={(e) =>  preventLetters(e)}
                            value={depositAmount}/>
                    </div>
                    <div className="yesbtnctr">
                            <button type="button" className="yesbtnp2" onClick={depositFunds}>
                                <h4 className="yesbtnp3">Confirm Deposit</h4>
                            </button>
                        </div>
                </div>
            </div>
            {error && <p className="amount-err">{error}</p>}
        </div>
    )
}

export default AddFunds