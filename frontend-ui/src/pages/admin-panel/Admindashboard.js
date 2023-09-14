import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Userstable from './Userstable';
import Blogstable from './Blogstable';
import { Button, Modal, Form } from 'react-bootstrap';
import AdminFooter from './AdminFooter';

function Admindashboard() {

    const navigate = useNavigate();
    const [admin, setAdmin] = useState("");
    const [blogData, setBlogdata] = useState([]);
    const [categoryData, setCategorydata] = useState([]);
    const [userData, setUserdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [colorCode, setColorcode] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {

        const adminToken = localStorage.getItem("Admin-token");
        setAdmin(JSON.parse(localStorage.getItem('Admin-data')));

        if (adminToken) {
            navigate("/admin/dashboard");
        }
        else {
            navigate("/login");
        }

        axios     // get Blog-data from API
            .get("http://localhost:3001/get-blog")
            .then(data => setBlogdata(data.data.data))
            .catch(error => console.log(error));

        getAPIdata();   // get category from API

        axios    // get User from API
            .get("http://localhost:3001/user/get-user")
            .then(data => setUserdata(data.data.data))
            .catch(error => console.log(error));

    }, [navigate]);


    // _______________Get Category API Data

    const getAPIdata = () => {

        axios
            .get("http://localhost:3001/get-category")
            .then(data => {
                setCategorydata(data.data.data);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }


    // ___________ Edit category

    const setData = (data) => {
        handleShow();
        setName(data.name);
        setColorcode(data.colorCode);
        setEditId(data._id);
        setIsEditing(true);
    }

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        setName("");
        setColorcode("");
        setShow(true);
        setIsEditing(false);
    }

    const addCategory = async () => {

        if (name && colorCode) {

            const data = {
                name: name,
                colorCode: colorCode
            }
            if (editId && isEditing) {
                try {
                    await axios.post(`http://localhost:3001/update-category?_id=${editId}`, data);
                    handleClose();

                } catch (error) {
                    setMsg(error.response.data.msg);
                }

            } else {
                try {
                    await axios.post(`http://localhost:3001/create-category`, data);
                    handleClose();

                } catch (error) {
                    setMsg(error.response.data.msg);
                }
            }
            await getAPIdata();

        } else {
            alert("Please fill in all required fields and provide a valid color code in the format #rrggbb");
        }

    }


    // ____________ Delete category

    const confirmDelete = (data) => {
        setDeleteId(data._id);
    };

    const cancelDelete = () => {
        setDeleteId(null);
    };

    const deleteCategory = async () => {
        if (deleteId) {
            await axios.delete(`http://localhost:3001/delete-category?_id=${deleteId}`);
            setDeleteId(null);
            await getAPIdata();
        }
    }


    return (
        <>
            <div className='d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary'>
                <AdminSidebar />
                <div className='h-screen flex-grow-1 overflow-y-lg-auto'>
                    <AdminHeader admin={admin} />
                    <main className="py-5 px-2 bg-surface-secondary">
                        <div className="container-fluid">
                            <div className="row g-6 mb-6">
                                <div className="col-xl-4 col-12">
                                    <div className="card shadow border-0 m-3 p-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="fs-sm-4 fs-5 font-semibold text-muted text-sm d-block mb-2">Blog-Posts</span>
                                                    <span className="fs-2 font-bold mb-0">{blogData.length}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-primary text-white text-lg rounded-2 p-0 p-md-5 p-sm-2 fs-1">
                                                        <i className="bi bi-book"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-12">
                                    <div className="card shadow border-0 m-3 p-3" >
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="fs-sm-4 fs-5 font-semibold text-muted text-sm d-block mb-2">Category-tags</span>
                                                    <span className="fs-2 font-bold mb-0">{categoryData.length}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-info text-white text-lg rounded-2 p-0 p-md-5 p-sm-2 fs-1">
                                                        <i className="bi bi-bookmarks"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-12 ">
                                    <div className="card shadow border-0 m-3 p-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="fs-sm-4 fs-5 font-semibold text-muted text-sm d-block mb-2">Users</span>
                                                    <span className="fs-2 font-bold mb-0">{userData.length}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white text-lg rounded-2 p-0 p-md-5 p-sm-2 fs-1">
                                                        <i className="bi bi-people"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/***************  Category Table  ***********/}

                        <div className="container-fluid p-4 " >
                            <h3 className='m-3' ><i className="bi bi-bookmarks"></i> Category Tags
                                <button className="ms-3 btn btn-outline-primary fs-5 p-1" onClick={handleShow}>
                                    <i className="bi bi-plus me-1"></i>Create
                                </button>
                            </h3>
                            <div className='rounded-3 p-3 bg-white shadow '>
                                <table className="table " >
                                    <thead>
                                        <tr>
                                            <th className='fs-6 ps-4'>Sr No.</th>
                                            <th className='fs-6 ps-4'>Name</th>
                                            <th className='fs-6 ps-4'>Color</th>
                                            <th className='fs-6 ps-4'>Edit</th>
                                            <th className='fs-6 ps-4'>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="3">Loading...</td>
                                            </tr>
                                        ) : (
                                            categoryData.map((data, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className='ps-4'>{index + 1}</td>
                                                            <td className='ps-4'>{data.name}</td>
                                                            <td className='ps-4'>
                                                                <div
                                                                    style={{
                                                                        backgroundColor: data.colorCode,
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '50%',
                                                                        display: 'inline-block',
                                                                    }}
                                                                ></div>{data.colorCode}
                                                            </td>
                                                            <td className='ps-4'>
                                                                <button className="btn btn-light" onClick={() => { setData(data) }}>
                                                                    <i className="bi bi-pencil"></i>
                                                                </button>
                                                            </td>
                                                            <td className='ps-4'>
                                                                <button className="btn btn-light" onClick={() => { confirmDelete(data) }}>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        )}
                                    </tbody>

                                    {/***************  Model For Delete Confirmation  ***********/}

                                    <Modal show={!!deleteId} onHide={cancelDelete}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirm Deletion</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant='secondary' onClick={cancelDelete}>
                                                Cancel
                                            </Button>
                                            <Button variant='danger' onClick={deleteCategory}>Delete</Button>
                                        </Modal.Footer>
                                    </Modal>

                                    {/*************  Model For Edit and Create  ****************/}
                                    <Modal show={show} onHide={handleClose} className='p-5' >
                                        <Modal.Header closeButton  >
                                            <h4 className='text-primary'>Category Tag</h4>
                                        </Modal.Header>
                                        <Form className='p-5 bg-light'>
                                            <Form.Group className="mb-4" >
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter name"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value) }}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-5" >
                                                <Form.Label>Color-Code</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    name="colorCode"
                                                    value={colorCode}
                                                    onChange={(e) => { setColorcode(e.target.value) }}
                                                />
                                            </Form.Group>
                                            <h5>{msg}</h5>
                                        </Form>
                                        <Modal.Footer className='mt-4'>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={addCategory}>
                                                Submit
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </table>
                            </div>
                        </div>

                        <Userstable userData={userData} />
                        <Blogstable blogData={blogData} />
                    </main>
                    <AdminFooter />
                </div>
            </div>

        </>
    )
}

export default Admindashboard;