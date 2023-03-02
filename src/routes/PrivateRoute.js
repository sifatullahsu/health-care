import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if ((loading)) {
    return <div>loading</div>
  }

  if (user && user?.uid) {
    return children;
  }

  return <Navigate to='/authentication' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;