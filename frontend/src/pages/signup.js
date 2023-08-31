import React from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Login from './Login';


function Signup() {

    const [username, setUsename] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [userToken, setUsertoken] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        const post = {
            username: username,
            email: email,
            password: password
        }
        try {
            const res = await axios.post('http://localhost:3001/register', post);
            console.log(res);
            setMsg(res.data.msg);
            localStorage.setItem('User-token', res.data.token);
            setUsertoken(res.data.token);
        } catch (e) {
            setMsg(e.response.data.msg);
        }
    }



    if (userToken) {
        return (
            <>
                <Login></Login>
            </>
        )
    } else {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col></Col>
                        <Col >
                            <Form className='bg-light border p-5' action='' onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name='username' required placeholder="Enter username" value={username} onChange={(e) => { setUsename(e.target.value) }} />
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
                                <p>Already have an account? <Link to='/login'>Login</Link> Here</p>
                                <h1>{msg}</h1>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Signup