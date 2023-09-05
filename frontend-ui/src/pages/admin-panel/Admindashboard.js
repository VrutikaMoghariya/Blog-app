import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Card, Col, Container, Row } from 'react-bootstrap';

function Admindashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("Admin-token");
    if (adminToken) {
      navigate("/admin/dashboard");
    }
    else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={2} className="bg-dark text-white">
            <AdminSidebar />
          </Col>
          <Col sm={10}>
            <AdminHeader />

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Admindashboard;