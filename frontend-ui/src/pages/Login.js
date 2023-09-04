import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from "axios";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("User-token");
    const AdminToken = localStorage.getItem("Admin-token");
    if (userToken) {
      navigate('/blogs');
    }
    if (AdminToken) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);



  const loginForm = async (isAdmin) => {

    try {

      if (!email || !password) {
        return alert("Please Enter valid Fields");
      }

      const data = {
        email: email,
        password: password
      }

      if (isAdmin) {
        const response = await axios.post('http://localhost:3001/admin-login', data);
        localStorage.setItem('Admin-token', response.data.token);
        navigate('/admin/dashboard');
      } else {
        const response = await axios.post('http://localhost:3001/login', data);
        localStorage.setItem('User-token', response.data.token);
        navigate('/blogs');
      }

    } catch (e) {
      setMsg(e.response.data.msg);
    }

  };


  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col></Col>
          <Col>
            <div className='bg-light border p-5'>
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' required placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' required placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>
              <Button type="submit" className='bg-theme-pink' onClick={() => { loginForm(false) }}>Log In</Button>
              <Button type="submit" className='bg-danger m-2' onClick={() => { loginForm(true) }} >Admin Login</Button>
              <br></br>
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
              <h4 className='mx-auto text-danger mt-5'> {msg} </h4>
            </div>

          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default Login;