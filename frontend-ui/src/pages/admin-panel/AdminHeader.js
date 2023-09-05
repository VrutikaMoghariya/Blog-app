import React from 'react';
import { Navbar, Nav, Button , Image } from 'react-bootstrap';

const AdminHeader = () => {
    return (
        <>
            <Navbar bg="dark" variant="light" sticky="top">
                <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Item className="d-flex align-items-center">
                        <Image
                            src=""
                            alt="User Avatar"
                            roundedCircle
                            className="mr-2"
                            width="30"
                            height="30"
                        />
                        userName
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    );
};

export default AdminHeader;
