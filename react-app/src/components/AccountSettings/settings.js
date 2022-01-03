import { useSelector, useDispatch} from 'react-redux';
function Settings () {
    const user = useSelector(state => state.session.user)   
    return (
        <div>
            <div className="accountlowwrapper">
                <div className="accountlowcontainer">
                    <div className="accounttitlecon">
                        <h3 className="accounttitle">Account Information</h3>
                    </div>
                    <div className="accountpart1cont">  
                        <p className="accountpart2cont">First Name</p>
                        <p className="accountpart3cont">{user.firstName}</p>
                    </div>
                    <div className="accountpart1cont">
                        <p className="accountpart2cont">Last Name</p>
                        <p className="accountpart3cont">{user.lastName}</p>
                    </div>
                    <div className="accountpart1cont">   
                        <p className="accountpart2cont">Email Address</p>
                        <p className="accountpart3cont">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings