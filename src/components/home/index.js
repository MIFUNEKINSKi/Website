import React from 'react';
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../data/portfolio";
import Icon from "../icon";

const PageSlug = ({ index, name }) => (
    <div className="page-slug">
        <span className="index">{index}</span>
        <span>{name}</span>
        <span className="rule" />
        <span>NY · {new Date().getFullYear()}</span>
    </div>
);

const Home = ({ setExpandedProject }) => {
    const navigate = useNavigate();
    const featured = ["humn", "vitalstream"].map((id) =>
        PROJECTS.find((project) => project.id === id)
    ).filter(Boolean);

    const openProject = (id) => {
        setExpandedProject(id);
        navigate("/projects");
    };

    return (
        <div className="home">
            <PageSlug index="01" name="Index" />

            <header className="home-hero">
                <h1 className="home-hero-name">
                    <span className="lf">Christopher</span>
                    <span className="lf">
                        Moore <span className="editorial">— builds</span>
                    </span>
                    <span className="lf">
                        <span className="editorial">trusted data systems</span>
                    </span>
                    <span className="lf">for regulated, real-world work.</span>
                </h1>

                <div className="home-positioning">
                    <div className="home-positioning-meta">
                        <span>Focus</span>
                        Stat Programming · Data Systems · AI Integration · Healthcare Analytics
                        <br />
                        <span style={{ marginTop: 12, display: "block" }}>Stack</span>
                        Python · SQL · SAS · AWS · Terraform
                    </div>
                    <p>
                        <em>Statistical Programmer at Parexel</em> working with regulated
                        clinical data, validation, and analysis-ready datasets. Outside that
                        role, I build production-grade data products — including HUMN, an
                        AWS-backed health behavior app with event-driven scoring and secure
                        biometric data flows.
                    </p>
                </div>

                <div className="home-cta-row">
                    <button className="cta" onClick={() => navigate("/projects")}>
                        See selected work <Icon name="arrowR" size={14} />
                    </button>
                    <button className="cta ghost" onClick={() => navigate("/contact")}>
                        Get in touch
                    </button>
                </div>
            </header>

            <section className="featured-section">
                <div className="featured-header">
                    <h2>Featured work</h2>
                    <span
                        className="see-all"
                        onClick={() => navigate("/projects")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") navigate("/projects");
                        }}
                    >
                        See all {PROJECTS.length} projects →
                    </span>
                </div>
                <div className="featured-grid">
                    {featured.map((p) => (
                        <article
                            key={p.id}
                            className="featured-card"
                            onClick={() => openProject(p.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") openProject(p.id);
                            }}
                        >
                            <div className="featured-card-top">
                                <h3>{p.name}</h3>
                                <div
                                    className="featured-accent"
                                    style={{ "--accent-color": p.accent }}
                                />
                            </div>
                            <p className="tagline">{p.tagline}</p>
                            <div className="featured-card-meta">
                                {p.metrics.slice(0, 3).map((m, i) => (
                                    <span key={i}>
                                        <strong>{m.value}</strong>
                                        {m.label}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="tech-strip">
                <div className="tech-strip-rule">
                    <span>What I reach for</span>
                    <span className="rule" />
                    <span>2026</span>
                </div>
                <div className="tech-strip-content">
                    <span>Python</span>
                    <span className="sep">/</span>
                    <span>R</span>
                    <span className="sep">/</span>
                    <span>SAS</span>
                    <span className="sep">/</span>
                    <span>SQL</span>
                    <span className="sep">/</span>
                    <span>PySpark</span>
                    <span className="sep">/</span>
                    <span>TypeScript</span>
                    <span className="sep">/</span>
                    <span>AWS</span>
                    <span className="sep">/</span>
                    <span>Terraform</span>
                    <span className="sep">/</span>
                    <span>Docker</span>
                    <span className="sep">/</span>
                    <span>Clinical Data</span>
                    <span className="sep">/</span>
                    <span>OMOP · FHIR</span>
                    <span className="sep">/</span>
                    <span className="dim">React</span>
                    <span className="sep">/</span>
                    <span className="dim">dbt</span>
                    <span className="sep">/</span>
                    <span className="dim">Earth Engine</span>
                </div>
            </section>
        </div>
    );
};

export default Home;
