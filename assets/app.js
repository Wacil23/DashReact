import React, { useContext, useState } from "react";
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import './styles/app.css';
import Connexion from "./Connexion/connexion";
import Home from "./Home";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./Context/AuthContext";

const app = () => {
    const [isAuth, setIsAuth] = useState(AuthContext)
    console.log('is Auth ?', isAuth);
    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth}}>

            <div>
                <BrowserRouter>
                    <div>
                        <Routes>
                            {/* Dashboard */}
                            <Route element={<PrivateRoute />}>
                                <Route element={<Home />} path='*' />
                            </Route>
                            <Route path="/connexion" element={<Connexion />} />
                        </Routes>
                    </div>
                </BrowserRouter >
            </div>


        </AuthContext.Provider>
    );
}

export default app;