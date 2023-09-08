import React, { useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Contact() {

  const navigate = useNavigate();
  useEffect(()=>{
    
    const adminToken = localStorage.getItem("Admin-token");

    if (!adminToken) {
      navigate("/contact");
    }
    else {
      navigate("/admin/dashboard");
    }

  },[navigate])
  

  return (
    <>
      <Header />
      <h1>Contact</h1>
    </>
  )
}

export default Contact;