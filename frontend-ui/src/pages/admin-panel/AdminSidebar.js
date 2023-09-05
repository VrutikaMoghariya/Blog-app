import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const AdminSidebar = () => {

    const navigate = useNavigate();
    const clickonLogout = () => {
        navigate('/login');
        localStorage.removeItem("Admin-token");
    }

    return (
        <>
            <Navbar id="vertical-navbar" bg="dark" variant="dark" expand="lg" fixed="left" className='ps-4 fs-5'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="flex-column">
                        <Navbar.Brand as={Link} to="/home">Brand link</Navbar.Brand>
                        <Nav.Link as={Link} to="/section1">Blog-Category</Nav.Link>
                        <Nav.Link as={Link} to="#">Section 2</Nav.Link>
                        <Nav.Link as={Link} to="#">Section 3</Nav.Link>
                        <Nav.Link as={Link} to="/login" onClick={clickonLogout} >Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default AdminSidebar;
