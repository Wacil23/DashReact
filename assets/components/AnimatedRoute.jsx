import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Connexion from '../Connexion/connexion';
import Home from '../Home'
import { AnimatePresence } from 'framer-motion';

function AnimatedRoute() {
    const { isAuth, setIsAuth } = useStateContext()
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='*' element={isAuth ? <Home /> : <Connexion/>} />
                
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoute;