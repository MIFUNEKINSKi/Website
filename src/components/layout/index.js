import "./index.scss";
import React from 'react';

import Sidebar from "../sidebar";
import Home from '..//home';
import About from '../about';
import Projects from "../projects";
import Contact from "../contact";
import { Outlet, Route, Routes } from "react-router-dom";

const Layout = () => {
    return (
        <div className="App">
            <Sidebar/>
            <div className="page">
                <Outlet />
                    <Routes>
                        <Route index element={<Home />}/>
                        <Route path="/about" element={<About />}/>
                        <Route path="/projects" element={<Projects />}/>
                        <Route path="/contact" element={<Contact />}/>
                    </Routes>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;