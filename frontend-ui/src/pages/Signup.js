import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function Signup() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [userToken, setUsertoken] = useState("");

  useEffect(() => {
    if (userToken) {
      navigate("/blogs");
    }
    else {
      navigate("/signup");
    }
  }, [navigate , userToken])

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password
    }
    try {
      const response = await axios.post('http://localhost:3001/register', user);
      setMsg(response.data.msg);
      setUsertoken(response.data.token);
      localStorage.setItem('User-token', response.data.token);
    } catch (e) {
      setMsg(e.response.data.msg);
    }
  }

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col></Col>
          <Col >
            <Form className='bg-light border p-5' onSubmit={handleSubmit}>
              <Form.Group className="mb-3" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name='name' required placeholder="Enter name" value={name} onChange={(e) => { setName(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' required placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' required placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>
              <Button type="submit">Submit</Button>
              <p className='my-4'>Already have an account? <Link to='/login'>Login</Link> Here</p>
              <h1>{msg}</h1>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default Signup;