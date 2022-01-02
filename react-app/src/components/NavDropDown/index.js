import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router"; 
import React, { useRef } from "react"; 
import { logout } from "../../store/session"   
import './menu.css'      
import { useDetectOutsideClick } from "./NavUtils";
import settings from './settings.svg' 

function NavDrop () {  
    const dropdownRef = useRef(null);  
    const dispatch = useDispatch(); 
    const history = useHistory(); 
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);    
    const user = useSelector((state) => state?.session?.user);  
    const buyingPower = useSelector(state => state?.session?.user?.buyingPower)  
    const assets = useSelector(state => state?.userAssets)  
    let total = 0 

     
    const logoutButton = async () => {
        await dispatch(logout());
        history.push("/");
      };


    return (
        <div className="dropDownContainer">   
        {console.log(assets)}
            <div className="avatarContainer navAvatar" onClick={onClick}>
                <p>Account</p> 
            </div>
            <div
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
            >
                <ul> 
                    <li> 
                        <div className='avatarReroute' >
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/percentage-growth.png"/>  
                        Assets 
                        </div>  
                    </li> 
                    <li > 
                        <div className='avatarReroute' >
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/bonds.png"/> 
                        ${buyingPower} 
                        </div>  
                    </li> 
                    <li onClick={() => history.push('/account')}> 
                        <div className='avatarReroute' >
                        <img src={settings} alt="Settings Icon" draggable="false" /> 
                        Settings
                        </div>  
                    </li> 
                    <li className='borderTop' onClick={logoutButton}>
                        <p>Log Out</p> 
                    </li>
                </ul>
            </div>
        </div>   
    )
}

export default NavDrop