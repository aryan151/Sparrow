import { useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import AddFunds from "./addfunds";  
import Settings from "./settings"; 
import './account.css'
function Account () {
    const [toggle, setToggle] = useState(1)  
    const user = useSelector(state => state.session.user)  

    return (
        <div className='settings_main'>
            <div className="settings_upper_container"> 
                <div className="user_name_container">
                    <h2 className="user_name_text">{user.firstName}  {user.lastName}</h2>
                    <div className="settings_label_container">
                        <h3 className={toggle === 1 ? "settings_label_active" : "settings_label" } onClick={() => setToggle(1)}>User Info</h3>
                        <h3 className={toggle === 0 ? "settings_label_active" : "settings_label" }onClick={() => {setToggle(0)}}>Add Funds</h3> 
                    </div>  
                </div>
            </div>
            <div> 
                {toggle === 0 ? <AddFunds /> : <Settings/>}   
            </div>  
        </div>

    )
}

export default Account