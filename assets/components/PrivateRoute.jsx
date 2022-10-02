import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import Connexion from '../Connexion/connexion';
import { useStateContext } from '../contexts/ContextProvider';
import Home from '../Home';

const PrivateRoute = () => {
  const { isAuth } = useStateContext()
  
  return (
    <Route element={isAuth ? <Home /> : <Connexion />} />
  )

};

export default PrivateRoute;