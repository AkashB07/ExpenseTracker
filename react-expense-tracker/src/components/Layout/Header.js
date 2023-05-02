import { Fragment, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";

const tokenId = localStorage.getItem("tokenID");

const Header = props => {

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

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><h1>Expense Tracker</h1></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/profile">Update Profile</Nav.Link>
          </Nav>
          <Button variant="secondary" onClick={verifyEmail}>Verify Email</Button>
        </Container>
      </Navbar>

    </Fragment>
  );
}

export default Header;