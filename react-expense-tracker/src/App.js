import React, { useState, Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

let App = () => {

  return (
    <Fragment>
      
      <Switch>
        <Route path='/' exact> <h1>Welcome to Expense Tracker</h1> </Route>
        
        <Route path='/login' exact> <LoginPage /> </Route>
        <Route path='/signup' exact> <SignupPage /> </Route>
        <Route path='*'> <Redirect to='/login' /> </Route>
      </Switch>
    </Fragment>
  );
}

export default App;