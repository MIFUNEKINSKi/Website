import React from 'react';
import { SKILL_CATEGORIES } from "../../data/portfolio";

const PageSlug = ({ index, name }) => (
    <div className="page-slug">
        <span className="index">{index}</span>
        <span>{name}</span>
        <span className="rule" />
        <span>NY · {new Date().getFullYear()}</span>
    </div>
);

const About = () => (
    <div className="about">
        <PageSlug index="02" name="About" />
        <h1 className="about-h1">
            I work where <em>statistical programming</em>
            <br />
            meets production data systems.
        </h1>

        <section className="about-intro">
            <div>
                <p>
                    My work sits between{" "}
                    <span className="accent">
                        regulated clinical data, statistical programming, data engineering,
                        and software integration
                    </span>{" "}
                    — the common thread is making messy, high-stakes data reliable enough
                    for decisions.
                </p>
            </div>
            <div>
                <p>
                    I am currently a Statistical Programmer at Parexel, working in a regulated
                    environment where correctness, documentation, reproducibility, and validation
                    matter because downstream outputs support clinical research decisions.
                    My technical toolkit includes SAS, Python, SQL, R, AWS, Terraform, Docker,
                    and modern analytics engineering patterns.
                </p>
                <p>
                    Outside work, I build product systems that stretch that foundation into
                    software engineering: HUMN uses API Gateway, Lambda, DynamoDB, S3, Cognito,
                    Terraform, and scoring logic to turn biometric and digital-behavior signals
                    into product-facing feedback loops. Other projects cover healthcare
                    interoperability, geospatial analytics, and automated data products.
                </p>
                <p>
                    I care about reliability — schema-validated ingestion, caching layers, retry
                    logic, and observability that catches silent regressions before they reach a
                    dashboard. Good data engineering means the pipeline runs at 3 AM on Sunday
                    and nobody gets paged.
                </p>
            </div>
        </section>

        <section className="skills-block">
            <div className="page-slug" style={{ margin: 0 }}>
                <span className="index">02·a</span>
                <span>Tools &amp; capabilities</span>
                <span className="rule" />
            </div>
            <div className="skills-grid">
                {SKILL_CATEGORIES.map((cat) => (
                    <div className="skill-cat" key={cat.num}>
                        <div className="skill-cat-num">{cat.num}</div>
                        <h3>{cat.title}</h3>
                        <div className="skill-list">
                            {cat.skills.map((s, i) => (
                                <span key={i}>{s}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="lives">
            <h2>Past lives</h2>
            <div className="lives-list">
                <div className="life-row">
                    <span className="life-year">2023 — now</span>
                    <span className="life-role">
                        <em>Parexel</em> — Statistical Programmer · regulated clinical data / SAS / Python / SQL
                    </span>
                    <span className="life-place">Remote · NY</span>
                </div>
                <div className="life-row">
                    <span className="life-year">2024 — 26</span>
                    <span className="life-role">
                        <em>Independent</em> projects — HUMN, healthcare data systems, and applied AI/data products
                    </span>
                    <span className="life-place">Remote · NY</span>
                </div>
                <div className="life-row">
                    <span className="life-year">Earlier</span>
                    <span className="life-role">
                        <em>Software</em> training and project work — full-stack apps, APIs, and data tooling
                    </span>
                    <span className="life-place">—</span>
                </div>
            </div>
        </section>
    </div>
);

export default About;
