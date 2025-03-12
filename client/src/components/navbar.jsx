import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import PostAd from "./postAd";



function Navigationbar() {
  let navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPostAd, setShowPostAd] = useState(false); 

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" className="text-success fw-bold">
            PakClassified
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate(`/`)}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate(`/about`)}>About</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown" onClick={() => navigate(`/categories`)}>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => navigate(`/contact`)}>Contact</Nav.Link>
         
                <Button type="button" className="bg-success" onClick={() => setShowPostAd(true)}>
                  Post Advertisement <GoArrowRight />
                </Button>
                  <Button className="mx-2 bg-success" onClick={() => setShowLogin(true)}>Login</Button>
                  <Button variant="success bg-success" onClick={() => setShowSignUp(true)}>Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modals */}
      <Signup show={showSignUp} handleClose={() => setShowSignUp(false)} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
      <PostAd show={showPostAd} handleClose={() => setShowPostAd(false)} /> 
    </>
  );
}

export default Navigationbar;

