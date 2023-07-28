// import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }: any) => {
  const { user } = useAuth();
  console.log(user);
  const location = useLocation();
  return user?.user_roles.find((role: any) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
