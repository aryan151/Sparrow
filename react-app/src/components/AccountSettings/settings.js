import { useSelector, useDispatch} from 'react-redux';
function Settings () {
    const user = useSelector(state => state.session.user)   
    return (
        <div>
            <div className="settings_lower_container">
                <div className="account_information_container">
                    <div className="account_information_title_container">
                        <h3 className="account_information_title">Account Information</h3>
                    </div>
                    <div className="account_username_container">
                        <p className="username_label">First Name</p>
                        <p className="username">{user.firstName}</p>
                    </div>
                    <div className="account_username_container">
                        <p className="username_label">Last Name</p>
                        <p className="username">{user.lastName}</p>
                    </div>
                    <div className="account_username_container">
                        <p className="username_label">Email Address</p>
                        <p className="username">{user.email}</p>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Settings