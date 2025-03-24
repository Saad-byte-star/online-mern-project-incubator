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
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/login.slice";
import { Link } from "react-router-dom";

function Navigationbar() {
  const { loggedIn, data } = useSelector((state) => state.Login);
  const user = data?.currentuser
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPostAd, setShowPostAd] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

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

              {/* Show Post Ad Button Only When Logged In */}
              {loggedIn && (
                <Button type="button" className="bg-success" onClick={() => setShowPostAd(true)}>
                  Post Advertisement <GoArrowRight />
                </Button>
              )}

              {/* Show Login and SignUp when NOT logged in */}
              {!loggedIn ? (
                <>
                  <Button className="mx-2 bg-success" onClick={() => setShowLogin(true)}>Login</Button>
                  <Button variant="success bg-success" onClick={() => setShowSignUp(true)}>Sign Up</Button>
                </>
              ) : (
                <>
                  {/* // Show Logout Button when logged in */}
                  <Button className="mx-2 bg-danger" onClick={handleLogout}>Logout</Button>
                  <Link to="/userdashboard">
                    <img style={{ height: "45px", objectFit: "cover" }} src={`http://localhost:5000/public/images/${user.image}`} className="ms-3 rounded-circle" />
                  </Link>
                </>
              )}
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



// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { Button } from "react-bootstrap";
// import { useState } from "react";
// import { GoArrowRight } from "react-icons/go";
// import { useNavigate } from "react-router-dom";
// import Signup from "./signup";
// import Login from "./login";
// import PostAd from "./postAd";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../slices/login.slice";

// function Navigationbar() {

//   const { loggedIn } = useSelector(state => state.Login)
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     dispatch(logout());
//   };




//   let navigate = useNavigate();
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showPostAd, setShowPostAd] = useState(false);

//   return (
//     <>
//       <Navbar expand="lg" className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home" className="text-success fw-bold">
//             PakClassified
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link onClick={() => navigate(`/`)}>Home</Nav.Link>
//               <Nav.Link onClick={() => navigate(`/about`)}>About</Nav.Link>
//               <NavDropdown title="Categories" id="basic-nav-dropdown" onClick={() => navigate(`/categories`)}>
//                 <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link onClick={() => navigate(`/contact`)}>Contact</Nav.Link>

//               <Button type="button" className="bg-success" onClick={() => setShowPostAd(true)}>
//                 Post Advertisement <GoArrowRight />
//               </Button>
//               <Button className="mx-2 bg-success" onClick={() => setShowLogin(true)}>Login</Button>
//               <Button variant="success bg-success" onClick={() => setShowSignUp(true)}>Sign Up</Button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Modals */}
//       <Signup show={showSignUp} handleClose={() => setShowSignUp(false)} />
//       <Login show={showLogin} handleClose={() => setShowLogin(false)} />
//       <PostAd show={showPostAd} handleClose={() => setShowPostAd(false)} />
//     </>
//   );
// }

// export default Navigationbar;

