import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';


const PrivateRoute = ({ path, component }) => {
    const { isAuth } = useContext(AuthContext)
    return isAuth ? (<Route path={path} component={component} />) : (<Redirect to="/login" />)
};

export default PrivateRoute;