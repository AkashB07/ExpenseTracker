import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Theme from "./components/Layout/Theme";
import styled from "styled-components";
import theme from "styled-theming";

import { authActions } from "./store/auth";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import PasswordPage from './pages/Password';
import ReportPage from "./pages/Report";
import HomePage from './pages/Home';
import LeaderboardPage from "./pages/Leaderboard";
import Header from './components/Layout/Header';


export const backgroundColor = theme("theme", {
  light: "#fff",
  dark: "#2d2d2d",
});

export const textColor = theme("theme", {
  light: "#000",
  dark: "#fff",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: san-serif;
  background-color: ${backgroundColor};
  color: ${textColor};
`;


let App = () => {

  const { isLogin,  token, isPremium} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedIsPremium = localStorage.getItem("isPremium");
    if (savedToken && savedIsPremium) {
      dispatch(authActions.login({ token: savedToken, ispremiumuser: savedIsPremium }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("token", token);
      localStorage.setItem("isPremium", isPremium);
    } 
    else {
      localStorage.removeItem("isPremium");
      localStorage.removeItem("isPremium");
    }
  }, [token, isPremium, isLogin]);


  return (
    <Theme>
      <Container>
        <Switch>
          <Route path='/home' exact><Header /><HomePage /></Route>
          <Route path='/report' exact><Header /><ReportPage /></Route>
          <Route path='/leaderboard' exact><Header /><LeaderboardPage /></Route>
          <Route path='/login' exact> <LoginPage /> </Route>
          <Route path='/signup' exact> <SignupPage /> </Route>
          <Route path='/password' exact> <PasswordPage /> </Route>
          <Route path='/profile' exact> <Header /> <ProfilePage /> </Route>
          <Route path='*'> <Redirect to='/login' /> </Route>
        </Switch>
      </Container>
    </Theme>
  );
}

export default App;