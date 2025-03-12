// import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../slices/login.slice";

const Login = ({ show, handleClose }) => {

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  let dispatch = useDispatch()
  const { data, loggedIn } = useSelector((state) => state.Login);
  const loginData = {
    email,
    password
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Sending Login data:", loginData);
    dispatch(user(loginData));
    console.log('Logged In :' , loggedIn);
    if (!loggedIn) {
      alert('Login Failed , Invalid Credentials')
    }
    else {
      alert('Login Successful!')
    }
    handleClose();
  };

  

  return (


    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>

        <Modal.Title className='fw-bold'>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit} >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;




