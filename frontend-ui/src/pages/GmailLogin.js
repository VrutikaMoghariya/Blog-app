import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function GmailLogin() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    console.log(token);

    if (token) {
      try {
        localStorage.setItem('User-token', token);
        navigate('/blogs');
      } catch (error) {
        console.error('Error setting token in localStorage:', error);
      }
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <div>
      <h1>Gmail Login</h1>
      <div>
        <h1>Log In With Gmail Successfully</h1>
        <p>Congratulations! You have successfully logged in with your Gmail account.</p>
      </div>
    </div>
  );
}

export default GmailLogin;
