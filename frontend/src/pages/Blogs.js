import React, { useEffect, useState } from 'react';
import axios from "axios";
import { SlCalender } from "react-icons/sl";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Blogs() {

  const [token, setToken] = useState("");

  const [blogData, setBlogdata] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("User-token");
    setToken(token);
  },[])

  useEffect(() => {

    // get Blog-data from API
    axios
      .get("http://localhost:3001/get-blog")
      .then(data => setBlogdata(data.data.data))
      .catch(error => console.log(error));

  }, [])

    return (
      <>
        <Container>
          <Col>
              <Button className='d-flex fs-4 bg-light text-dark  mx-auto'>Create Your Own Blog</Button>
          </Col>
          
          {
            blogData.map((item) => {
              return (
                <>
                  <Col >
                    <Card className='p-4 my-5 border-0 rounded-4 shadow bg-body'>
                      <Row>
                        <Col lg={4} md={12}>
                          <div className='overflow-hidden rounded-4 shadow bg-body m-2' style={{ width: '250px', height: '250px' }}>
                            <Card.Img variant="top" src={item.img} className='blog-img  w-100 h-100   ' />
                          </div>
                        </Col>
                        <Col lg={6} md={12}>
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
                        <Col>
                          <Button className='m-2'>EDIT</Button>
                          <Button className='m-2'>DELETE</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </>
              )
            })
          }
        </Container>
      </>
   
    )  
}


export default Blogs