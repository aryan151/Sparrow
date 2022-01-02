import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Splash from './components/SplashPage';
import SingleStock from './components/SingleStock'
import Dash from './components/Dashboard/dash'  
import Account from './components/AccountSettings';
import {fetchAllStocks} from './store/stocks'
import { authenticate } from './store/session';
import {setTheme} from './store/theme'  
import './index.css'  

function App() { 
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme)  

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      dispatch(setTheme()) 
      await dispatch(fetchAllStocks())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }  

  return (
    <div className={`${theme} app`}> 
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/dash' exact={true} >
          <Dash/> 
        </ProtectedRoute>
        <ProtectedRoute path='/stocks/:ticker'>
            <SingleStock/>
        </ProtectedRoute>  
        <ProtectedRoute path='/account' exact={true}>   
            <Account/>
        </ProtectedRoute>    
      </Switch>  
    </BrowserRouter>
    </div>
  );
}

export default App;
