// LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Authentication/AuthService'; // Make sure this path is correct
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isLoggedOut = await logoutUser(); // Function to log out the user
    console.log(isLoggedOut);
    if (isLoggedOut) {
      navigate('/'); // Navigate to login page after logout
    }
  };

  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  );
};

export default LogoutButton;
