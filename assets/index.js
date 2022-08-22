import React from 'react'
import ReactDOM from "react-dom/client";
import App from './app';
import { registerLicense } from '@syncfusion/ej2-base';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/index.css'
import Line from './components/Line';
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXmJWf1FpTGpQdk5yd19DaVZUTX1dQl9hSXlTckVmXHtfcHNVRGM=');



const rootElement = ReactDOM.createRoot(document.querySelector('#app'));
rootElement.render(
  <React.StrictMode>      
    <BrowserRouter>
    <Routes>
                            {/* Dashboard */}
                            <Route path="/" element="Ecommerce" component={App} />
                            <Route path="/ecommerce" element="Ecommerce" />

                            {/* Pages */}
                            <Route path="/orders" element="Orders" />
                            <Route path="/employees" element="Employees" />
                            <Route path="/customers" component={Line} />

                            {/* APPS */}
                            <Route path="/kanban" element="kanban" />
                            <Route path="/editor" element="Editor" />
                            <Route path="/calendar" element="Calendar" />

                            {/* Charts */}
                            <Route path="/line" element="Line" />
                            <Route path="/area" element="Area" />
                            <Route path="/bar" element="Bar" />
                            <Route path="/pie" element="Pie" />
                            <Route path="/financial" element="Financial" />
                            <Route path="/color-mapping" element="ColorMapping" />
                            <Route path="/pyramid" element="Pyriamid" />
                            <Route path="/stacked" element="Stacked" />
                        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
