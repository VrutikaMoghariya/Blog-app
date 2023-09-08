import React, { useEffect, useState } from 'react';
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { SlCalender } from "react-icons/sl";
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import Timestamp from './Timestamp';

function Blogs() {

  const navigate = useNavigate();
  const [blogData, setBlogdata] = useState([]);
  const [categoryData, setCategorydata] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [editId, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);

  //_______________ Handle Model

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => {
    setCategory("");
    setDescription("");
    setImg("");
    setTitle("");
    setEditId("");
    setShow(true);
    setIsEditing(false);
  }


  //_______________ Navigate Page

  useEffect(() => {
    const userToken = localStorage.getItem("User-token");
    if (!userToken) {
      navigate('/login');
    } else {
      getAPIdata();
    }
  }, [navigate]);


  //________________ Get API Data

  useEffect(() => {
    axios           // Get Category 
      .get("http://localhost:3001/get-category")
      .then(category => setCategorydata(category.data.data))
      .catch(error => console.log(error));
  }, []);


  //________________ Get Blog API Data

  const getAPIdata = () => {

    const userToken = localStorage.getItem("User-token");

    axios
      .get("http://localhost:3001/get-user-blog", {
        headers: {
          'authorization': userToken,
        },
      })
      .then(blog => setBlogdata(blog.data.data))
      .catch(error => console.log(error));
  };


  //_______________ Create Blog

  const addBlog = async () => {

    if (title && description && category && img) {

      const userToken = localStorage.getItem("User-token");

      const formData = new FormData();

      console.log(typeof img);

      if (typeof img == "string") {
        formData.append("img", img);
      }
      else if (typeof img == "object") {
        formData.append("img", img[0]);
      }

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      if (isEditing && editId) {

        try {
          await axios.post(`http://localhost:3001/update-blog?_id=${editId}`, formData, {
            headers: {
              "authorization": userToken,
            }
          });
        } catch (error) {
          console.error("Edit blog Error:", error);
        }

      }
      else {

        try {
          await axios.post("http://localhost:3001/create-blog", formData, {
            headers: {
              'authorization': userToken,
            }
          })
        } catch (error) {
          console.error("Create blog Error:", error);
        }

      }
      await getAPIdata();
      handleClose();

    } else {
      alert("Please fill in all required fields");
    }
  }



  //________________ Edit Blog

  const setData = (data) => {
    handleShow();
    setCategory(data.category._id);
    setDescription(data.description);
    setImg(data.img);
    setTitle(data.title);
    setEditId(data._id);
    setIsEditing(true);
  }

  //________________ Delete Blog

  const confirmDelete = (data) => {
    setDeleteId(data._id);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const deleteBlog = async () => {

    const userToken = localStorage.getItem("User-token");

    if (deleteId) {
      await axios.delete(`http://localhost:3001/delete-blog?_id=${deleteId}`, {
        headers: {
          'authorization': userToken,
        }
      });
      setDeleteId(null);
      await getAPIdata();
    }
  };


  return (
    <>
      <Header />

      <Container>
        <Col>
          <Button className='d-flex fs-4 bg-light text-dark  mx-auto' onClick={handleShow}>Create Your Own Blog</Button>
        </Col>
        <Col>


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
                          <Card.Img variant="top" src={"http://localhost:3001/images/" + item.img} className='blog-img  w-100 h-100   ' />
                        </div>
                      </Col>
                      <Col lg={6} md={12}>
                        <Card.Body className='ps-3'>
                          <Button style={{ backgroundColor: ' #EFF1F4' }} className='rounded-pill fs-6 category-btn text-capitalize border-0 text-dark px-3 py-1 mb-3'>
                            <svg height="20" width="20">
                              <circle cx="8" cy="8" r="4" fill={item.category.colorCode} />
                            </svg>
                            {item.category.name}
                          </Button>
                          <Card.Title title={item.description} className='blog-title ' ><h2 className='fw-bold'>{item.title}</h2></Card.Title>
                          <Card.Text className='fs-5 text-wrap' title={item.description} style={{ textOverflow: 'ellipsis', overflow: 'hidden', WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                            {item.description}
                          </Card.Text>
                          <Card.Footer className=" p-0 text-secondary border-0 bg-white">
                            <SlCalender className='me-1' /> <Timestamp createdAt={item.createdAt} />
                          </Card.Footer>
                        </Card.Body>
                      </Col>
                      <Col>
                        <Button className='m-2' onClick={() => { setData(item) }}>EDIT</Button>
                        <Button variant='danger' onClick={() => { confirmDelete(item) }}> DELETE </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </>
            )
          })
        }
      </Container>

      <Footer />

      {/***************** model Form Delete Confirmation **************/}

      <Modal show={!!deleteId} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant='danger' onClick={deleteBlog}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/***************** model Form For Create and Update Blog **************/}

      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton />
        <Form className='p-3 bg-light' encType="multipart/form-data">
          <Form.Group className="mb-3" >
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" name='title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" as="textarea" rows={3} name='description' placeholder="Enter Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Category</Form.Label>
            <Form.Select name='category' value={category} defaultValue={category} onChange={(e) => { setCategory(e.target.value) }}>
              <option>Select category</option>
              {
                categoryData.map((item) => {
                  return (
                    <>
                      <option value={item._id}>{item.name}</option>
                    </>
                  )
                })
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Img</Form.Label>
            <Form.Control type="file" name='img' onChange={(e) => { setImg(e.target.files) }} />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addBlog}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Blogs;