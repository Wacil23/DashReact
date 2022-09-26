import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';


const PrivateRoute = () => {
    const { isAuth } = useContext(AuthContext)

    return(
        isAuth ? <Outlet /> : <Navigate to='/connexion' />
    ) 
};

export default PrivateRoute;