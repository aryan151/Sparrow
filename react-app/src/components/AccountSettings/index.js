import { useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import AddFunds from "./addfunds";
import Settings from "./settings"; 

function Account () {
    const [toggle, setToggle] = useState(0)  
    return (
        <div>
            <p> settings</p>
        </div>
    )
}

export default Account