import React, { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Button, Form } from 'react-bootstrap';

function CreateAdmin() {
    useEffect(() => {

    }, [])
    return (
        <>
            <div className='d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary'>
                <AdminSidebar />
                <div className='h-screen flex-grow-1 overflow-y-lg-auto'>
                    <main className="py-5 px-2 bg-surface-secondary">
                        <Form className='bg-light border p-5'>
                            <Form.Group className="mb-3" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='name' required placeholder="Enter name" value="" onChange={() => {}} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' required placeholder="Enter email" value="" onChange={() => { }} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' required placeholder="Password" value="" onChange={() => {}} />
                            </Form.Group>
                            <Button type="submit">Create</Button>
                        </Form>
                    </main>
                </div>
            </div>
        </>
    )
}

export default CreateAdmin