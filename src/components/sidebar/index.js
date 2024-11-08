import "./index.scss";
import React from 'react';

import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome, faUser, faRectangleList} from "@fortawesome/free-solid-svg-icons";
import { faAngellist, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ProfilePhoto from "../../assets/images/headshot.jpg"


const Sidebar = () => (
    <div className="nav-bar">
        <Link className='logo' to='/'>
            <img src={ProfilePhoto} className="sidebar-photo" alt="logo"></img>
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#4d4d4de" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser} color="#4d4d4de" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/projects">
                <FontAwesomeIcon icon={faRectangleList} color="#4d4d4de" />
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
            <li>
                <a target="_blank" rel="noreferrer" href='https://angel.co/u/chris-moore-50'>
                    <FontAwesomeIcon icon={faAngellist} color="#4d4d4e"/>
                </a>
            </li>
        </ul>
    </div>
)


export default Sidebar;