import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from '../../App';


export const linkStyle = {
  textDecoration: 'none',
  color: "blue",
  fontSize: '1rem'
}
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const brandLogo = {
    fontSize: '2rem',
  }
  return (
    <Navbar bg="transparent" expand="lg" collapseOnSelect>
      <Container>
        <Link style={brandLogo} className="navbar-brand font-weight-bold" to="/">TRAVEL THE TOWN</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link style={linkStyle} className="mx-3 my-2" to="/home">Home</Link>
            <Link style={linkStyle} className="mx-3 my-2" to="/destination/bk1">Destination</Link>
            <Link style={linkStyle} className="mx-3 my-2 " to="/blog" aria-disabled>Blog</Link>
            <Link style={linkStyle} className="mx-3 my-2" to="/contact">Contact</Link>
            {
              loggedInUser.isSignedIn ?
                <strong style={{ paddingTop: '9px' }}>{loggedInUser.name}</strong>
                : <Link style={linkStyle} className="btn btn-success mx-3" to="/login"> Log In</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
