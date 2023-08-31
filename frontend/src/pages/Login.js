import React from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Blogs from './Blogs';
import { useEffect } from 'react';
import Home from './Home';



function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [userToken, setUsertoken] = useState("");
  const [storageToken, setStoragetoken] = useState("");
  const [isLogin, setlogin] = useState(false);


  useEffect(() => {
    const getToken = localStorage.getItem("User-token");
    setStoragetoken(getToken);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      email: email,
      password: password
    }
    try {
      const res = await axios.post('http://localhost:3001/login', post);
      setUsertoken(res.data.token);
      localStorage.setItem('User-token', res.data.token);
      setlogin(true);
      console.log("Token  : " + userToken);
    } catch (e) {
      setMsg(e.response.data.msg);
    }
  }




  if (isLogin) {
    return (
      <>
        <Blogs></Blogs>
      </>
    )
  }
  else {
    if (!storageToken) {
      return (
        <>
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
                  <Button type="submit" className='bg-theme-pink'>Submit</Button>
                  <br></br>
                  Don't have an account yet? <Link to="/signup">Sign Up</Link>
                </Form>
                <p>{msg}</p>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      )
    } else {
      return (
        <>
          <Home></Home>
        </>
      )

    }
  }
}

export default Login;

