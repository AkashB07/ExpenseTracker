import React, { useState, Fragment, useContext, Link } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import PasswordPage from './pages/Password';
import HomePage from './pages/Home';
import Header from './components/Layout/Header';


let App = () => {

  return (
    <Fragment>
      
      <Switch>
        <Route path='/' exact><Header/><HomePage/></Route>
        <Route path='/login' exact> <LoginPage /> </Route>
        <Route path='/signup' exact> <SignupPage /> </Route>
        <Route path='/password' exact> <PasswordPage /> </Route>
        <Route path='/profile' exact> <Header/> <ProfilePage/> </Route>
        <Route path='*'> <Redirect to='/login' /> </Route>
      </Switch>
    </Fragment>
  );
}

export default App;