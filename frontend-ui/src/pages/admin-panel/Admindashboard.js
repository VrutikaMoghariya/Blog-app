import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admindashboard() {

  const navigate = useNavigate();

  useEffect(()=>{
    const adminToken =  localStorage.getItem("Admin-token");
    if (adminToken) {
      navigate("/admin/dashboard");
    }
    else {
      navigate("/login");
    }

  })
  return (
    <div>Admindashboard</div>
  )
}

export default Admindashboard;