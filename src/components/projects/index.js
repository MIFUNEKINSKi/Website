import React from 'react';
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

const CodeBlock = ({ filename, code }) => (
    <div className="code-block">
        <div className="code-header">
            <span style={{ display: "inline-flex", gap: 5, marginRight: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "oklch(0.55 0.05 60)" }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "oklch(0.55 0.05 60)" }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "oklch(0.55 0.05 60)" }} />
            </span>
            <span>source</span>
            <span className="filename">{filename}</span>
        </div>
        <pre><code>{code}</code></pre>
    </div>
);

const ProjectRow = ({ p, total, isExpanded, onToggle }) => (
    <article className={`project-row ${isExpanded ? "expanded" : ""}`}>
        <div
            className="project-row-header"
            onClick={onToggle}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle();
                }
            }}
        >
            <div className="project-row-num" style={{ "--accent-color": p.accent }}>
                {p.num} / {String(total).padStart(2, "0")}
            </div>
            <div className="project-row-name">
                <h2>{p.name}</h2>
                <div className="project-row-tagline">{p.tagline}</div>
            </div>
            <div className="project-row-toggle">
                {isExpanded ? "Collapse" : "Expand"}
                <span className="chev"><Icon name="chev" size={14} /></span>
            </div>
        </div>

        <div className="metrics-row">
            {p.metrics.map((m, i) => (
                <div className="metric" key={i}>
                    <div className="metric-value">{m.value}</div>
                    <div className="metric-label">{m.label}</div>
                </div>
            ))}
        </div>

        <div className="chips">
            {p.techStack.map((t, i) => (
                <span className="chip" key={i}>{t}</span>
            ))}
        </div>

        {isExpanded && (
            <>
                <div className="project-expanded">
                    <div>
                        <div className="detail-h3">Architecture</div>
                        <ul className="arch-list">
                            {p.architecture.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                    </div>
                    <div>
                        <div className="detail-h3">Code</div>
                        {p.demoMedia && (
                            <figure className="demo-media">
                                <img
                                    src={p.demoMedia.src}
                                    alt={p.demoMedia.alt}
                                    loading="lazy"
                                    width={p.demoMedia.width}
                                    height={p.demoMedia.height}
                                />
                                <figcaption>{p.demoMedia.caption}</figcaption>
                            </figure>
                        )}
                        <CodeBlock filename={p.codeFile} code={p.codeSnippet} />
                        {p.codeSnippetSecondary && (
                            <>
                                <div className="code-subhead">More from the codebase</div>
                                <CodeBlock filename={p.codeFileSecondary} code={p.codeSnippetSecondary} />
                            </>
                        )}
                    </div>
                    <div className="deep-dive">
                        <div className="detail-h3">Technical detail</div>
                        <p>{p.deepDive}</p>
                    </div>
                </div>
                <div className="card-links">
                    <a className="link-btn primary" href={p.githubLink} target="_blank" rel="noreferrer">
                        <Icon name="github" size={13} /> Source
                    </a>
                    {p.liveLink && (
                        <a className="link-btn" href={p.liveLink} target="_blank" rel="noreferrer">
                            <Icon name="external" size={13} /> Live Demo
                        </a>
                    )}
                </div>
            </>
        )}
    </article>
);

const Projects = ({ expandedProject, setExpandedProject }) => {
    return (
        <div className="projects">
            <PageSlug index="03" name="Projects" />
            <h1 className="projects-h1">
                Selected <em>work</em>.
            </h1>
            <p className="projects-intro">
                Five production-shape systems — satellite fusion, event-driven AWS, clinical
                data standards, and full-stack web. Click a row for architecture, code, and
                technical notes. Source links sit at the bottom of each.
            </p>

            <div className="projects-list">
                {PROJECTS.map((p) => (
                    <ProjectRow
                        key={p.id}
                        p={p}
                        total={PROJECTS.length}
                        isExpanded={expandedProject === p.id}
                        onToggle={() =>
                            setExpandedProject(expandedProject === p.id ? null : p.id)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
