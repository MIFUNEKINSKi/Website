import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../sidebar";
import Home from '../home';
import About from '../about';
import Projects from "../projects";
import Contact from "../contact";
import { trackPageView } from "../../analytics";

const Layout = () => {
    const [expandedProject, setExpandedProject] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        trackPageView(location.pathname);
    }, [location.pathname]);

    // Keyboard navigation: 1–4 jump between pages
    useEffect(() => {
        const onKey = (e) => {
            const tag = e.target.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.key === "1") navigate("/");
            if (e.key === "2") navigate("/about");
            if (e.key === "3") navigate("/projects");
            if (e.key === "4") navigate("/contact");
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [navigate]);

    return (
        <div className="app">
            <Sidebar />
            <main className="main">
                <div
                    className="main-inner route-fade-enter route-fade-enter-active"
                    key={location.pathname}
                >
                    <Routes>
                        <Route index element={<Home setExpandedProject={setExpandedProject} />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/projects"
                            element={
                                <Projects
                                    expandedProject={expandedProject}
                                    setExpandedProject={setExpandedProject}
                                />
                            }
                        />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Layout;
