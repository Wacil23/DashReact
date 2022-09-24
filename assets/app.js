import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Area, Bar, Pie, Financial, ColorMapping, Editor, Line } from './pages'
import './styles/app.css';
import { useStateContext } from "./contexts/ContextProvider";
import Connexion from "./Connexion/connexion";

const app = () => {

    

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element={<Connexion />} />
                        <Route path="/ecommerce" element={<Ecommerce />} />

                        {/* Pages */}
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/customers" element={<Customers />} />

                        {/* Apps */}
                        <Route path="/kanban" element={<Kanban />} />
                        <Route path="/editor" element={<Editor />} />
                        <Route path="/calendar" element={<Calendar />} />

                        {/* Charts */}
                        <Route path="/line" element={<Line />} />
                        <Route path="/area" element={<Area />} />
                        <Route path="/bar" element={<Bar />} />
                        <Route path="/pie" element={<Pie />} />
                        <Route path="/financial" element={<Financial />} />
                        <Route path="/color-mapping" element={<ColorMapping />} />
                        <Route path="/pyramid" element={<Pyramid />} />
                        <Route path="/stacked" element={<Stacked />} />
                    </Routes>
                </div>
            </BrowserRouter >
        </div>
    );
}

export default app;