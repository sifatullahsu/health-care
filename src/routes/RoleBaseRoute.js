import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const RoleBaseRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (role.indexOf(user.role) !== -1) {
    return children
  }

  return <Navigate to='/dashboard' replace></Navigate>;
};

export default RoleBaseRoute;