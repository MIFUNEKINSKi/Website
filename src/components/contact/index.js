import "./index.scss";
import React from 'react';
import Loader from "react-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
    return (
        <>
            <div className="container contact-page">
                <div className="text-zone">
                    <h1>Get in touch</h1>
                    <p>
                        I'm actively looking for data engineering, data analytics,
                        and software engineering roles. The fastest way to reach me
                        is email — I usually reply within a day.
                    </p>
                    <ul className="contact-list">
                        <li>
                            <a href="mailto:moorexchristopher@gmail.com">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>moorexchristopher@gmail.com</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/chris-moore-27438989/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                                <span>linkedin.com/in/chris-moore-27438989</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/MIFUNEKINSKi/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                                <span>github.com/MIFUNEKINSKi</span>
                            </a>
                        </li>
                    </ul>
                    <p className="location-line">Based in New York City — open to remote and hybrid.</p>
                </div>
            </div>
            <Loader type="line-scale" />
        </>
    );
};

export default Contact;
