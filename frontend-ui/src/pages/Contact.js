import React, { useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

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
      <Footer/>
    </>
  )
}

export default Contact;