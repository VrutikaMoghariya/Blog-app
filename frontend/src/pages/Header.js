import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Row } from 'react-bootstrap';
import { Button, Modal, Form } from 'react-bootstrap';
import { FiMoon, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [storageToken, setStoragetoken] = useState("");

    useEffect(() => {
        const userToken = localStorage.getItem("User-token");
        setStoragetoken(userToken);

    }, []);

    const clickonLogout = async () => {
        setStoragetoken("");
        localStorage.removeItem("User-token");
        return navigate('/login?')
    }



    return (
        <>
            <Container fluid className='py-5 '  >
                <Row className='mx-md-4 mx-sm-3 mx-1 '>
                    <Navbar expand="lg" className=" bg-white rounded px-md-5 px-sm-2 px-1  py-3 mx-auto  d-flex d-flex-row shadow  bg-body rounded-3 " style={{ maxWidth: '1320px' }}>
                        <Navbar.Brand href="#home">
                            <a href="/" className="logo-image theme-light-logo">
                                <img src="https://neon.gbjsolution.com/content/images/2022/12/logo-dark.svg" className='w-50' alt="Neon" />
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto text-dark ">
                                <Nav.Link href="/" className='menu mx-2'>Home</Nav.Link>
                                <Nav.Link href={storageToken ? "/blogs" : "/login"} className='menu mx-2'>Blogs</Nav.Link>
                                <Nav.Link href="/contact" className='menu mx-2'>Contact</Nav.Link>
                            </Nav>
                            <Button className='btn nav-icon text-dark border-0 bg-white mx-1 fs-5' onClick={handleShow}><FiSearch /></Button>
                            <Button className='btn nav-icon text-dark border-0 bg-white mx-1 fs-5'><FiMoon /></Button>
                            {storageToken ? <Button onClick={clickonLogout} className='signin btn  px-4 mx-3 rounded-pill'>Logout</Button> :
                                <Link to='/login'><Button className='signin btn  px-4 mx-3 rounded-pill'>Login</Button></Link>}
                        </Navbar.Collapse>
                        <Modal show={show} onHide={handleClose} className='p-0 mt-5 '>
                            <Modal.Body>
                                <Form >
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <button id="button-addon2" type="submit" class="btn btn-link text-dark "><FiSearch /></button>
                                        </div>
                                        <input type="search" placeholder="Search Posts, tags & authors" aria-describedby="button-addon2" class="form-control border-0 " />
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Navbar>
                </Row>
            </Container>
        </>
    )
}

export default Header