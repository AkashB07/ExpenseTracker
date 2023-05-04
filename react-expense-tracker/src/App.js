import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import Theme from "./components/Layout/Theme";
import styled from "styled-components";
import theme from "styled-theming";

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import PasswordPage from './pages/Password';
import HomePage from './pages/Home';
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
  
  ${"" /* align-items: clearInterval;
  justify-content: clearInterval; */
  }
  font-family: san-serif;
  background-color: ${backgroundColor};
  color: ${textColor};
`;


let App = () => {

  return (
    <Theme>
      <Container>
        <Switch>
        <Route path='/home' exact><Header/><HomePage/></Route>
        <Route path='/login' exact> <LoginPage /> </Route>
        <Route path='/signup' exact> <SignupPage /> </Route>
        <Route path='/password' exact> <PasswordPage /> </Route>
        <Route path='/profile' exact> <Header/> <ProfilePage/> </Route>
         <Route path='*'> <Redirect to='/login' /> </Route>
        </Switch>
      </Container>
    </Theme>
  );
}

export default App;