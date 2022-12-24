import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';


const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  const location = useLocation();

  if ((userLoading)) {
    return <div>loading</div>
  }

  if (user && user?.uid) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;