import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import AnimatedRoute from "./components/AnimatedRoute";
import { useStateContext } from "./contexts/ContextProvider";
import Authentication from "./Services/Authentication";

const app = () => {
    const {currentMode} = useStateContext();
    Authentication.setup();
    console.log('render APP')
    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <BrowserRouter>
                <div>
                    <AnimatedRoute />
                </div>
            </BrowserRouter >
        </div>
    );
}

export default app;