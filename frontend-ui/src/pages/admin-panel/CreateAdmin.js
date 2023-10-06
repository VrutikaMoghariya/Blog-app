import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Button, Form } from 'react-bootstrap';
import AdminFooter from './AdminFooter';
import { adminSignUp, getAllAdmin } from '../../apis/admin';

function CreateAdmin() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [adminData, setAdmindata] = useState([]);

    const getAdminAPI = async () =>{
        const response = await getAllAdmin();
        setAdmindata(response);
    }

    useEffect(() => {
        getAdminAPI();
    }, []);

    
    const createAdmin = async (e) => {

        if (name && email && password) {
            e.preventDefault();
            const admin = {
                name: name,
                email: email,
                password: password
            }
            try {
                const response = await adminSignUp(admin);
                setMsg(response.data.msg);
                getAdminAPI();
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
                        <div className="container-fluid py-4 px-2 " >
                            <h3 className='m-3'><i className="bi bi-people"></i> Admin</h3>
                            <div className='rounded-3 p-3 bg-white w-50 shadow '>
                                <table className="table " >
                                    <thead className='bg-white '>
                                        <tr>
                                            <th className='fs-6 ps-4'>No.</th>
                                            <th className='fs-6 ps-4'>User-Name</th>
                                            <th className='fs-6 ps-4'>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            adminData.map((data, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className='ps-4'>{index + 1}</td>
                                                            <td className='ps-4'>{data.name}</td>
                                                            <td className='ps-4'>{data.email}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                    <AdminFooter/>

                </div>
            </div>
        </>
    )
}

export default CreateAdmin