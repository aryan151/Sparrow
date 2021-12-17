import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton' 
import Search from './Search';
import './NavBar.css'

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/Sign-up';

  const session = useSelector(state => state.session);
  

  if (isLoginPage || isSignUpPage) {
    return null
  } else {
    return (
      <nav>
        {
          !session.user ?
            (
              <>
                <NavLink to='/' exact={true} activeClassName='active'>
                  <div className='logo'>
                    <p>Sparrow</p>
                  </div>
                </NavLink>
                <div class="user-actions-container">
                  <NavLink className="login-button" to='/login' exact={true} activeClassName='active'>
                    Login
                  </NavLink>
                  <NavLink className="sign-up-button" to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                  </NavLink>
                </div>
              </>
            )
            :
            
            <div className='nav-content-container'>
              <NavLink to='/dash' exact={true} activeClassName='active'>
            <div className='logo'>
              <p>Sparrow</p>
            </div>
            </NavLink>
              <Search />
              <div className='navbar-buttons'>
                <LogoutButton/>
              </div>
            </div>
        }
      </nav>
    );
  }

}

export default NavBar;