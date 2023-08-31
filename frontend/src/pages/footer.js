
import React, { useState, useEffect } from 'react';
import { Row, Button, Form, InputGroup } from 'react-bootstrap';
import axios from "axios";
import { BiLogoTwitter, BiLogoFacebook, BiLogoLinkedin, BiLogoInstagram, BiLogoGithub } from "react-icons/bi";

function Footer() {

    const [blogData, setBlogdata] = useState([]);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        // get Blog-data from API
        axios
            .get("http://localhost:3001/get-blog")
            .then(data => setBlogdata(data.data.data))
            .catch(error => console.log(error));

        // get category from API
        axios
            .get("http://localhost:3001/get-category")
            .then(data => setCategory(data.data.data))
            .catch(error => console.log(error));

    }, [])




    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    return (
        <>
            <footer className="bg-white text-center text-dark">
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <div className=' py-4 my-2'>
                                <h2 className='mt-1 fw-bold'>Newsletter</h2>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group controlId="validationCustomUsername">
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    type="email"
                                                    className='rounded-pill py-0'
                                                    placeholder="Your email address"
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                />

                                                <Form.Control.Feedback type="invalid" className='text-white'>
                                                    Please enter email address.
                                                </Form.Control.Feedback>
                                                <Button type="submit" className='theme-bg-pink  fs-5 fw-bold rounded-pill p-3 m-1 py-2 border-0 mb-3' >Subscribe</Button>

                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </div>

                            <div className='p-2'>
                                <h4 className='my-4 fw-bold'>Follow US</h4>
                                <a href='#' style={{ background: '#f0f2f5' }} className=' text-center p-2 fs-4 shadow-sm me-2 text-info  rounded-circle lh-base'><BiLogoTwitter className='mx-1 mb-1' /></a>
                                <a href='#' style={{ background: '#f0f2f5' }} className=' text-center p-2 fs-4 shadow-sm me-2  rounded-circle lh-base'><BiLogoFacebook className='mx-1 mb-1' /></a>
                                <a href='#' style={{ background: '#f0f2f5' }} className=' text-center p-2 fs-4 shadow-sm me-2  rounded-circle lh-base'><BiLogoLinkedin className='mx-1 mb-1' /></a>
                                <a href='#' style={{ background: '#f0f2f5' }} className=' text-center p-2 fs-4 shadow-sm me-2 text-danger rounded-circle lh-base'><BiLogoInstagram className='mx-1 mb-1' /></a>
                                <a href='#' style={{ background: '#f0f2f5' }} className=' text-center p-2 fs-4 shadow-sm me-2 text-dark rounded-circle lh-base'><BiLogoGithub className='mx-1 mb-1' /></a>
                            </div>


                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">


                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" text-center p-3">
                    © 2023 Neon - All right Reserved. Proudly Published with Ghost
                </div>
            </footer >
        </>
    )
}

export default Footer