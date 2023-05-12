import { Fragment } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../store/auth';
import { themesActions } from "../../store/theme";

const Header = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const isPremium = useSelector((state) => state.auth.isPremium);
  
  const home = () => {
    history.push("/home");
  }

  const profile = () => {
    history.push("/profile");
  }

  const report = () => {
    history.push("/report");
  }

  const leaderboard = () => {
    history.push("/leaderboard");
  }

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(themesActions.themeLog(false));
    localStorage.removeItem("theme");
    history.replace("/login");
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Button variant="dark" onClick={home} size="lg"><h2>Expense Tracker</h2></Button>
          <Fragment>
            <Nav className="me-auto">
              <Button variant="dark" onClick={profile}>Update Profile</Button>
              {isPremium && <Button variant="dark" onClick={report}>Report</Button>}
              {isPremium && <Button variant="dark" onClick={leaderboard}>Leaderboard</Button>}
            </Nav>
            <Button variant="danger" onClick={logoutHandler} >Logout</Button>
          </Fragment>
        </Container>
      </Navbar>

    </Fragment>
  );
}

export default Header;