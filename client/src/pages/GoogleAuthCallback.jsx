import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';





const GoogleAuthCallback = async () => {
 
  const navigate = useNavigate()
  // AuthCallback.js
  useEffect(() => {
    // Extract token and user info from the URL query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const firstName = params.get('firstName');
    const lastName = params.get('lastName');
    console.log('params', params)
    if (token) {
      // Store the token and user info in localStorage or sessionStorage
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);

      // Redirect to homepage after successful login
      navigate('/');
    } else {
      console.error('No token found');
    }
  }, [navigate]);

  
}

export default GoogleAuthCallback