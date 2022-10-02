import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import AnimatedRoute from "./components/AnimatedRoute";
import Authentication from "./Services/Authentication";

const app = () => {
    Authentication.setup();
    console.log('render APP')
    return (
        <div>
            <BrowserRouter>
                <div>
                    <AnimatedRoute />
                </div>
            </BrowserRouter >
        </div>
    );
}

export default app;