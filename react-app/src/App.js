import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Splash from './components/SplashPage';
import SingleStock from './components/SingleStock'
import Dash from './components/Dashboard'  
import {fetchAllStocks} from './store/stocks'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(fetchAllStocks())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }  

  return (
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
