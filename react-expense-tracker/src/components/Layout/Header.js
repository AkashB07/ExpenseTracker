import { Fragment, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { authActions } from '../../store/auth';

const tokenId = localStorage.getItem("tokenID");

const Header = props => {
  const dispatch = useDispatch();
  // const isLogin = useSelector(state => state.auth.isLogin);
  const isLogin = true;
  const history = useHistory();

  const verifyEmail = async () => {
    try {
      const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDjqOQY_V4SVhSavTu5M9Y4qf1NFLRbo_0", {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (res.ok) {
        alert("Email Sent")
      }
      else {
        const data = await res.json()
        console.log(data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("tokenID");
    history.replace("/login");
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home"><h1>Expense Tracker</h1></Navbar.Brand>
          {
            isLogin && (<Fragment>
              <Nav className="me-auto">
                <Nav.Link href="/profile">Update Profile</Nav.Link>
              </Nav>
              <Button variant="secondary" onClick={verifyEmail}>Verify Email</Button>
              <Button variant="danger" onClick={logoutHandler} >Logout</Button>

            </Fragment>
            )
          }
        </Container>
      </Navbar>

    </Fragment>
  );
}

export default Header;