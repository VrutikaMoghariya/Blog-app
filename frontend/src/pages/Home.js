import React, { useEffect, useState } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { SlCalender } from "react-icons/sl";
import { BiLogoTwitter , BiLogoFacebook , BiLogoLinkedin , BiLogoInstagram , BiLogoGithub} from "react-icons/bi";
import Footer from './footer';




function Home() {

  const [blogData, setBlogdata] = useState([]);
  const [category, setCategory] = useState([]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  // get Blog-data from API

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

  return (
    <>

      {/* slider of blog */}

      <Container className='bg-info' style={{ height: '500px' }}>
        <Row xs={1} md={2} >
          <Carousel className='my-5 py-5'>
            {
              blogData.map((item) => {
                return (
                  <>
                    <Carousel.Item>
                      <Col >
                        <Card>
                          <Card.Img variant="top" src={item.img} />
                          <Card.Body>
                            <Card.Title >{item.title}</Card.Title>
                            <Card.Text>
                              {item.description}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Carousel.Item>
                  </>
                )
              })
            }
          </Carousel>
        </Row>
      </Container>


      {/* display all Blogs */}

      <Container className='d-flex'>
        <Row>
          <Col sm={12} lg={8}>
            {
              blogData.map((item) => {
                
                return (
                  <>
                    <Col >
                      <Card className='p-4 my-5 border-0 rounded-4 shadow bg-body'>
                        <Row>
                          <Col lg={4} md={11}>
                            <div className='overflow-hidden rounded-4 shadow bg-body m-2' style={{ width: '250px', height: '250px' }}>
                              <Card.Img variant="top" src={item.img} className='blog-img  w-100 h-100   ' />
                            </div>
                          </Col>
                          <Col lg={8}  md={11}>
                            <Card.Body className='ps-3'>
                              <Button style={{ backgroundColor: ' #EFF1F4' }} className='rounded-pill fs-6 category-btn text-capitalize border-0 text-dark px-3 py-1 mb-3'>
                                <svg height="20" width="20">
                                  <circle cx="8" cy="8" r="4" fill="#ff6347" />
                                </svg>
                                {item.category.name}
                              </Button>
                              <Card.Title title={item.description} className='blog-title ' ><h2 className='fw-bold'>{item.title}</h2></Card.Title>
                              <Card.Text className='fs-5 text-wrap' title={item.description} style={{ textOverflow: 'ellipsis', overflow: 'hidden', WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                                {item.description}
                              </Card.Text>
                              <Card.Footer className=" p-0 text-secondary border-0 bg-white"> <SlCalender className='me-1' /> 2 days ago</Card.Footer>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </>
                )
              })
            }
          </Col>

          {/*************** side block of homepage *********************/}

          <Col sm={12} lg={4}>
            <div className='p-4 ms-4 my-5 border-0 rounded-4 shadow-sm bg-body'>
                {/********************* Featured post *******************/}
              <div className='p-2'>
                <h4 className='mb-4 fw-bold'>Featured posts</h4>
                {
                  blogData.map((item, i) => {
                    if (i < 4) {
                      return (
                        <>
                          <Card className='my-3 border-0'>
                            <Row>
                              <Col lg={3}>
                                <div className='overflow-hidden rounded-3 shadow  bg-body m-1' style={{ width: '90px', height: '90px' }}>
                                  <Card.Img variant="top" src={item.img} className='blog-img  w-100 h-100 ' />
                                </div>
                              </Col>
                              <Col lg={9}>
                                <Card.Body className='ps-4'>
                                  <Card.Title title={item.description} className='blog-title mb-0' ><h5>{item.title}</h5></Card.Title>
                                  <div className=" text-secondary "><SlCalender className='me-1' /> 2 days ago</div>
                                </Card.Body>
                              </Col>
                            </Row>
                          </Card>
                        </>
                      )
                    }
                  })

                }
              </div>

              <div className='p-2 my-3'>
                <h4 className='mb-4 fw-bold'>Tags</h4>
                {
                  category.map((item) => {
                    return (
                      <>
                        <Button style={{ backgroundColor: ' #EFF1F4', fontSize: 'small' }} className='rounded-pill  category-btn text-capitalize border-0 text-dark px-2 py-1  m-2 '>
                          <svg height="20" width="20">
                            <circle cx="8" cy="8" r="4" fill="#ff6347" />
                          </svg>
                          {item.name}
                        </Button>
                      </>
                    )
                  })
                }
              </div>

              <div className='my-4 p-2 '>
                <h4 className='mb-4 fw-bold'>Latest posts</h4>
                {
                  blogData.map((item, i) => {
                    if (i < 3) {
                      return (
                        <>
                          <Card className='my-3 border-0'>
                            <Row>
                              <Col lg={3}>
                                <div className='overflow-hidden rounded-3 shadow  bg-body m-1' style={{ width: '90px', height: '90px' }}>
                                  <Card.Img variant="top" src={item.img} className='blog-img  w-100 h-100 ' />
                                </div>
                              </Col>
                              <Col lg={9}>
                                <Card.Body className='ps-4'>
                                  <Card.Title title={item.description} className='blog-title mb-0' ><h5>{item.title}</h5></Card.Title>
                                  <div className=" text-secondary "><SlCalender className='me-1' /> 2 days ago</div>
                                </Card.Body>
                              </Col>
                            </Row>
                          </Card>
                        </>
                      )
                    }
                  })

                }
              </div>

              <div className='p-4 m-2 theme-bg-pink text-white text-center  rounded-4'>
                <h2 className='mt-1 fw-bold'>Newsletter</h2>
                <h5 className=' mx-3 lh-base'>Get the latest posts delivered straight to your inbox.</h5>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustomUsername">
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          className='rounded-pill px-3 py-2 m-1'
                          placeholder="Your name"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid" className='text-white'>
                          Please enter your name.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustomUsername">
                      <InputGroup hasValidation>
                        <Form.Control
                          type="email"
                          className='rounded-pill px-3 py-2 m-1'
                          placeholder="Your email address"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid" className='text-white'>
                          Please enter email address.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Button type="submit" className='bg-white text-dark fs-5 fw-bold rounded-pill w-100 p-3 m-1 py-2 border-0 mb-3' >Subscribe</Button>
                </Form>
              </div>

              <div className='p-2'>
                <h4 className='my-4 fw-bold'>Follow US</h4>
                <a href='#' style={{background:'#f0f2f5'}} className=' text-center p-2 fs-4 shadow-sm me-2 text-info  rounded-circle lh-base'><BiLogoTwitter className='mx-1 mb-1'  /></a>
                <a href='#' style={{background:'#f0f2f5'}} className=' text-center p-2 fs-4 shadow-sm me-2  rounded-circle lh-base'><BiLogoFacebook className='mx-1 mb-1'  /></a>
                <a href='#' style={{background:'#f0f2f5'}} className=' text-center p-2 fs-4 shadow-sm me-2  rounded-circle lh-base'><BiLogoLinkedin className='mx-1 mb-1'  /></a>
                <a href='#' style={{background:'#f0f2f5'}} className=' text-center p-2 fs-4 shadow-sm me-2 text-danger rounded-circle lh-base'><BiLogoInstagram className='mx-1 mb-1'  /></a>
                <a href='#' style={{background:'#f0f2f5'}} className=' text-center p-2 fs-4 shadow-sm me-2 text-dark rounded-circle lh-base'><BiLogoGithub className='mx-1 mb-1'  /></a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer/>
    </>
  )
}

export default Home