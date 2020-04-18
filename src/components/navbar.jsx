import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <React.Fragment>
      {props.user ? (
        <React.Fragment>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
              Home
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/createpost">
                  Create New Post
                </Nav.Link>
                <Nav.Link as={Link} to="/posts">
                  Posts
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Button className="logout-btn" variant="dark" onClick={props.logOut}>
            Log Out
          </Button>
        </React.Fragment>
      ) : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </React.Fragment>
  );
};

export default NavBar;
