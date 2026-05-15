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
            I build pipelines that <em>turn messy data</em>
            <br />
            into actionable intelligence.
        </h1>

        <section className="about-intro">
            <div>
                <p>
                    My background spans{" "}
                    <span className="accent">
                        healthcare analytics, geospatial processing, and satellite imagery
                    </span>{" "}
                    — I'm drawn to problems where the data is complex and the stakes are real.
                </p>
            </div>
            <div>
                <p>
                    Day to day, I work with Python, SQL, AWS, Terraform, Docker, and dbt.
                    I've shipped production systems that fuse satellite imagery with web-scraped
                    market data, transform clinical records between healthcare standards, score
                    investment opportunities across 65 regions weekly, and turn HealthKit
                    observers into event-driven Lambda fan-outs with ~1-second upload-to-score lag.
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
                    <span className="life-year">2024 — 26</span>
                    <span className="life-role">
                        <em>Independent</em> projects — building &amp; shipping the work on the next page
                    </span>
                    <span className="life-place">Remote · NY</span>
                </div>
                <div className="life-row">
                    <span className="life-year">Earlier</span>
                    <span className="life-role">
                        <em>Healthcare</em> analytics &amp; statistical programming · SAS / SQL
                    </span>
                    <span className="life-place">—</span>
                </div>
                <div className="life-row">
                    <span className="life-year">Before</span>
                    <span className="life-role">
                        <em>School</em> &amp; a couple lateral moves into the field
                    </span>
                    <span className="life-place">—</span>
                </div>
            </div>
        </section>
    </div>
);

export default About;
