import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings, Pie, Stacked } from './components';
import { useStateContext } from './contexts/ContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Area, Bar, Calendar, ColorMapping, Customers, Ecommerce, Editor, Employees, Financial, Invoices, Kanban, Line, Orders, Pyramid } from './pages';
import { motion } from 'framer-motion'


const Home = () => {
    const { activeMenu } = useStateContext();
    return (
        <div>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
                    <TooltipComponent content="Settings" position="TopCenter">
                        <button type="button" className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white" style={{ background: 'blue', borderRadius: '50%' }}>
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ease-linear duration-200">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg ease-in-out duration-300">
                        <Sidebar />
                    </div>
                )}
                <div className={activeMenu ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  ' : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        <Navbar />
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Routes >
                            <Route path="/" element={<Ecommerce />} />
                            <Route path="/ecommerce" element={<Ecommerce />} />

                            {/* Pages */}
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/invoices" element={<Invoices />} />

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
                            <Route  path="*"  element='no found'/> 
                        </Routes>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Home;