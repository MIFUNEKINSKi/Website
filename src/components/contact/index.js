import React from 'react';
import { trackEvent } from "../../analytics";

const PageSlug = ({ index, name }) => (
    <div className="page-slug">
        <span className="index">{index}</span>
        <span>{name}</span>
        <span className="rule" />
        <span>NY · {new Date().getFullYear()}</span>
    </div>
);

const Contact = () => (
    <div className="contact">
        <PageSlug index="04" name="Contact" />

        <div className="contact-hero">
            <h1>
                Let's{" "}
                <br />
                <span className="editorial">talk shop.</span>
            </h1>
            <p className="contact-lead">
                Open to healthcare data systems, analytics engineering, AI integration,
                and data platform roles. Email is the fastest way to reach me — I reply
                within a day.
            </p>
        </div>

        <div className="contact-grid">
            <a
                className="contact-channel"
                href="mailto:moorexchristopher@gmail.com"
                onClick={() => trackEvent("contact_click", { channel: "email" })}
            >
                <span className="contact-channel-label">01 · Email — fastest</span>
                <span className="contact-channel-value">
                    moorexchristopher
                    <br />
                    @gmail.com
                </span>
                <span className="contact-channel-meta">Replies within ~24h</span>
            </a>
            <a
                className="contact-channel"
                href="https://www.linkedin.com/in/chris-moore-27438989/"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("contact_click", { channel: "linkedin" })}
            >
                <span className="contact-channel-label">02 · LinkedIn</span>
                <span className="contact-channel-value">
                    in/chris-moore
                    <br />
                    -27438989
                </span>
                <span className="contact-channel-meta">Connection requests welcome</span>
            </a>
            <a
                className="contact-channel"
                href="https://github.com/MIFUNEKINSKi/"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("contact_click", { channel: "github" })}
            >
                <span className="contact-channel-label">03 · GitHub</span>
                <span className="contact-channel-value">
                    github.com
                    <br />
                    /MIFUNEKINSKi
                </span>
                <span className="contact-channel-meta">
                    Source for the open projects on the previous page
                </span>
            </a>
            <div className="contact-channel" style={{ cursor: "default" }}>
                <span className="contact-channel-label">04 · Location</span>
                <span className="contact-channel-value">
                    New York
                    <br />
                    City
                </span>
                <span className="contact-channel-meta">
                    Open to remote &amp; hybrid · US-based roles
                </span>
            </div>
        </div>

        <div className="contact-footer">
            <span>Open to the right role</span>
            <span>Last updated · May 2026</span>
        </div>
    </div>
);

export default Contact;
