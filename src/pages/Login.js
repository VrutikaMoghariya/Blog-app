import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { userLogIn } from '../apis/user';
import { adminLogIn } from '../apis/admin';


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
    } else if (AdminToken) {
      navigate('/admin/dashboard');
    } else {
      navigate('/login');
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
        const response = await adminLogIn(data);
        navigate('/admin/dashboard');
        const adminData = {
          name: response.data.data.name,
          email: response.data.data.email
        }
        localStorage.setItem('Admin-token', response.data.token);
        localStorage.setItem('Admin-data', JSON.stringify(adminData));

      } else {

        await userLogIn(data);
        navigate('/blogs');
      }
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };


  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col></Col>
          <Col>
            <div className='bg-light border px-5 py-3'>
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' required placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' required placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>
              <div style={{ height: '30px' }} className='text-center fs-5 text-danger my-2'>{msg} </div>

              <div className='text-center w-100'>
                <Button type="submit" className='rounded-0 border m-2  bg-theme-pink' onClick={() => { loginForm(false) }}>
                  Log In
                </Button>
                <Button type="submit" className='rounded-0 border m-2  bg-success m-2' onClick={() => { loginForm(true) }} >
                  Admin Login
                </Button>
                <Button as={Link} to='https://blog-app-iicz.onrender.com/user/auth/google' className='bg-white my-4  text-dark rounded-0 border-secondary'>
                  <FcGoogle className='me-2 fs-5' />Login With Gmail
                </Button><br></br>
                Don't have an account yet? <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default Login;