import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home';
import Admindashboard from './admin-panel/admindashboard';
import Header from './Header';
import Blogs from './Blogs';



function Login() {

  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [storageToken, setStoragetoken] = useState("");
  const [isLogin, setlogin] = useState(false);


  useEffect(() => {
    const userToken = localStorage.getItem("User-token");
    const AdminToken = localStorage.getItem("Admin-token");
    if (userToken) {
      setStoragetoken(userToken);
    } else {
      setStoragetoken(AdminToken);
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }
    try {
      if (admin) {
        const response = await axios.post('http://localhost:3001/admin-login', data);
        localStorage.setItem('Admin-token', response.data.token);
      } else {
       
        const response = await axios.post('http://localhost:3001/login', data);
        localStorage.setItem('User-token', response.data.token);
      }
      setlogin(true);

    } catch (e) {
      console.log(e.response.data.msg);
      setMsg(e.response.data.message);
    }
  }


  if (isLogin) {
    if (admin) {
      return (
        <>
          <Admindashboard />
        </>
      )
    } else {
      return (
        <>
          <Blogs />
        </>
      )
    }
  }
  else {
    if (!storageToken) {
      return (
        <>
          <Header/>
          <Container fluid>
            <Row>
              <Col></Col>
              <Col >
                <Form className='bg-light border p-5' onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                  </Form.Group>
                  <Button type="submit" className='bg-theme-pink'>Log In</Button>
                  <Button type="submit" className='bg-danger m-2' onClick={() => { setAdmin(true) }} >Admin Login</Button>
                  <br></br>
                  Don't have an account yet? <Link to="/signup">Sign Up</Link>
                </Form>
                <h3 className='mx-auto'>{msg}</h3>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      )
    } else {
      return (
        <>
          <Home />
        </>
      )
    }
  }
}

export default Login;

