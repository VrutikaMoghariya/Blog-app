import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home';
import Admindashboard from './admin-panel/admindashboard';
import Header from './Header';
import Blogs from './Blogs';



function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [storageToken, setStoragetoken] = useState("");
  const [isLogin, setlogin] = useState(false);


  useEffect(() => {
    console.log("check");
    const userToken = localStorage.getItem("User-token");
    const AdminToken = localStorage.getItem("Admin-token");
    if (userToken) {
      setStoragetoken(userToken);
    }
    if (AdminToken) {
      setStoragetoken(AdminToken);
      navigate('/adminDashboard')
    }
  }, []);


  const handleSubmit = async (isAdmin) => {
    
    try {
      if(!email || !email){
        return alert("Please enter valid fields")
      }
      const data = {
        email: email,
        password: password
      }
      if (isAdmin) {
        const response = await axios.post('http://localhost:3001/admin-login', data);
        localStorage.setItem('Admin-token', response.data.token);
        navigate('/adminDashboard', { replace: true })
      } else {
        const response = await axios.post('http://localhost:3001/login', data);
        localStorage.setItem('User-token', response.data.token);
        navigate('/blogs')
      }
      setlogin(true);

    } catch (e) {
      console.log(e.response.data.msg);
      setMsg(e.response.data.msg);
    }
  }


  return (
    <>
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col></Col>
            <Col >
            <Form>
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' required placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' required placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>
              <Button type="submit" className='bg-theme-pink' onClick={() => { handleSubmit(false) }}>Log In</Button>
              <Button type="submit" className='bg-danger m-2' onClick={() => { handleSubmit(true) }} >Admin Login</Button>
            </Form>
              <br></br>
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
              <h3 className='mx-auto'>{msg}</h3>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </>
    </>
  )
}

export default Login;

