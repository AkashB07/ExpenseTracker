import { Fragment, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


const Header = props => {
  const history = useHistory();

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><h1>Expense Tracker</h1></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/profile">Update Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </Fragment>
  );
}

export default Header;