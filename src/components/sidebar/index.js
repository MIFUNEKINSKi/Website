import "./index.scss";
import React from 'react';

import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faRectangleList, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ProfilePhoto from "../../assets/images/headshot.jpg"


const navClass = (base) => ({ isActive }) =>
    isActive ? `${base} active` : base;

const Sidebar = () => (
    <div className="nav-bar">
        <Link className='logo' to='/'>
            <img src={ProfilePhoto} className="sidebar-photo" alt="logo"></img>
        </Link>
        <nav>
            <NavLink end className={navClass("home-link")} to="/" title="Home">
                <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
            </NavLink>
            <NavLink className={navClass("about-link")} to="/about" title="About">
                <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
            </NavLink>
            <NavLink className={navClass("projects-link")} to="/projects" title="Projects">
                <FontAwesomeIcon icon={faRectangleList} color="#4d4d4e" />
            </NavLink>
            <NavLink className={navClass("contact-link")} to="/contact" title="Contact">
                <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
            </NavLink>
        </nav>
        <ul>
            <li>
                <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/chris-moore-27438989/'>
                    <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e"/>
                </a>
            </li>
            <li>
                <a target="_blank" rel="noreferrer" href='https://github.com/MIFUNEKINSKi/'>
                    <FontAwesomeIcon icon={faGithub} color="#4d4d4e"/>
                </a>
            </li>
        </ul>
    </div>
)


export default Sidebar;