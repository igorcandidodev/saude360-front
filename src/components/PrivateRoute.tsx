import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuthContext } from '../context/userAuth'; 

const PrivateRoute = () => {
  const { userCpf } = useContext(UserAuthContext); 

  return userCpf ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;