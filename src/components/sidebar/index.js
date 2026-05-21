import React from 'react';
import { Link, NavLink } from "react-router-dom";
import Icon from "../icon";

const NAV = [
    { to: "/",         label: "Index",    num: "01", end: true },
    { to: "/about",    label: "About",    num: "02" },
    { to: "/projects", label: "Projects", num: "03" },
    { to: "/contact",  label: "Contact",  num: "04" },
];

const Sidebar = () => (
    <aside className="rail">
        <Link to="/" className="rail-wordmark">
            Chris<span className="ampersand">·</span>Moore
        </Link>
        <div className="rail-meta">
            <span>Statistical Programmer</span>
            <span>Data Systems · AI</span>
            <span>New York City</span>
        </div>

        <nav className="rail-nav" aria-label="Primary">
            {NAV.map((n) => (
                <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.end}
                    className={({ isActive }) =>
                        `rail-nav-item${isActive ? " active" : ""}`
                    }
                    title={n.label}
                >
                    <span className="rail-nav-num">{n.num}</span>
                    <span className="rail-nav-label">{n.label}</span>
                    <span className="rail-nav-active-dot" />
                </NavLink>
            ))}
        </nav>

        <div className="rail-spacer" />

        <div className="rail-footer">
            <div className="rail-footer-social">
                <a
                    href="https://github.com/MIFUNEKINSKi/"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon name="github" size={16} />
                </a>
                <a
                    href="https://www.linkedin.com/in/chris-moore-27438989/"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon name="linkedin" size={16} />
                </a>
                <a href="mailto:moorexchristopher@gmail.com" aria-label="Email">
                    <Icon name="mail" size={16} />
                </a>
            </div>
            <div
                style={{
                    color: "var(--ink-3)",
                    fontSize: 10,
                    letterSpacing: "0.10em",
                }}
            >
                © MMXXVI
            </div>
        </div>
    </aside>
);

export default Sidebar;
