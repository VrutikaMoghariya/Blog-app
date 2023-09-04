import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";

function DeleteConfirmation(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteBlog = async () => {

        await axios.delete(`http://localhost:3001/delete-blog?_id=${props.data._id}`);
        handleClosedelete();

    };

    return (
        <>
            <Button variant="danger" onClick={handleShowdelete}>
                Delete
            </Button>

            <Modal show={showdelete} onHide={handleClosedelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosedelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteBlog}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteConfirmation;
