import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkUser } from '../Authentication/AuthService';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkUser().then(isAuthenticated => {
      setIsAuthenticated(isAuthenticated);
    });
  }, []);

  if (isAuthenticated === null) {
    return null; // Render nothing or a loading spinner while checking the user
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
