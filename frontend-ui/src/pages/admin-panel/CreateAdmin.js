import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Button, Form } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';
import axios from "axios";

function CreateAdmin() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [adminData, setAdmindata] = useState([]);


    useEffect(() => {
        axios    // get User from API
            .get("http://localhost:3001/get-admin")
            .then(data => setAdmindata(data.data.data))
            .catch(error => console.log(error));
    }, [])


    const createAdmin = async (e) => {

        if (name && email && password) {
            e.preventDefault();
            const admin = {
                name: name,
                email: email,
                password: password
            }
            try {
                const response = await axios.post('http://localhost:3001/admin-register', admin);
                setMsg(response.data.msg);
                navigate("/admin/create-Admin");
                setName("");
                setEmail("");
                setPassword("");
            } catch (e) {
                setMsg(e.response.data.msg);
            }
        }
    }
    
    return (
        <>
            <div className='d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary'>
                <AdminSidebar />
                <div className='h-screen flex-grow-1 overflow-y-lg-auto'>
                    <main className="m-5 bg-surface-secondary">
                        <Form className='bg-white rounded-3 shadow w-50 p-5' onSubmit={createAdmin}>
                            <h4 className='mb-4'> Fill Details to Create Admin</h4>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
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
                            <Button type="submit">Create</Button>
                            <h5 className='mt-4 mb-0'>{msg}</h5>
                        </Form>
                    </main>
                </div>
            </div>
        </>
    )
}

export default CreateAdmin