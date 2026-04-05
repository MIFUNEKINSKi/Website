import "./index.scss";
import React, { useState } from 'react';
import Loader from "react-loaders";
import codeMarkDemoGif from "../../assets/images/code mark 1.gif";
import auteurFlixDemoGif from "../../assets/images/AuteurFlix1.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const CodeBlock = ({ code }) => (
    <div className="code-block">
        <div className="code-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
        </div>
        <pre><code>{code}</code></pre>
    </div>
);

const MetricBadge = ({ value, label }) => (
    <div className="metric-badge">
        <span className="metric-value">{value}</span>
        <span className="metric-label">{label}</span>
    </div>
);

const ProjectCard = ({ project, isExpanded, onToggle }) => (
    <div className={`project-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="card-accent" style={{ backgroundColor: project.accent }} />
        <div className="card-content">
            <div className="card-header" onClick={onToggle}>
                <div className="header-text">
                    <h2>{project.name}</h2>
                    <p className="tagline">{project.tagline}</p>
                </div>
                <button className="expand-btn" aria-label="Toggle details">
                    <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                </button>
            </div>

            <div className="metrics-row">
                {project.metrics.map((m, i) => (
                    <MetricBadge key={i} value={m.value} label={m.label} />
                ))}
            </div>

            <div className="tech-chips">
                {project.techStack.map((tech, i) => (
                    <span className="chip" key={i}>{tech}</span>
                ))}
            </div>

            {project.demoMedia && (
                <figure className="project-demo-media">
                    <img
                        src={project.demoMedia.src}
                        alt={project.demoMedia.alt}
                        loading="lazy"
                        width={project.demoMedia.width}
                        height={project.demoMedia.height}
                    />
                    {project.demoMedia.caption && (
                        <figcaption>{project.demoMedia.caption}</figcaption>
                    )}
                </figure>
            )}

            {isExpanded && (
                <div className="expanded-content">
                    <div className="detail-columns">
                        <div className="detail-left">
                            <h3>Architecture</h3>
                            <ul className="architecture-list">
                                {project.architecture.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="detail-right">
                            <h3>Code</h3>
                            <CodeBlock code={project.codeSnippet} />
                            {project.codeSnippetSecondary && (
                                <>
                                    <h4 className="code-subhead">More from the codebase</h4>
                                    <CodeBlock code={project.codeSnippetSecondary} />
                                </>
                            )}
                        </div>
                    </div>
                    {project.deepDive && (
                        <div className="deep-dive">
                            <h3>Technical Detail</h3>
                            <p>{project.deepDive}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="card-links">
                <a href={project.githubLink} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithub} /> Source
                </a>
                {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="live-link">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Live Demo
                    </a>
                )}
            </div>
        </div>
    </div>
);

const Projects = () => {
    const [expandedIdx, setExpandedIdx] = useState(null);

    const toggleExpand = (idx) => {
        setExpandedIdx(expandedIdx === idx ? null : idx);
    };

    const projects = [
        {
            name: "CloudClearingAPI",
            tagline: "Automated land investment intelligence pipeline for 65 Indonesian regions",
            accent: "#4CAF50",
            metrics: [
                { value: "65", label: "Regions" },
                { value: "5", label: "Data Sources" },
                { value: "94%", label: "Live Market" },
                { value: "~4x", label: "Parallel Speedup" },
            ],
            techStack: ["Python", "Google Earth Engine", "AWS", "Terraform", "Docker", "ThreadPoolExecutor", "OSM Overpass", "Web Scraping"],
            architecture: [
                "Dual-sensor satellite fusion: Sentinel-2 optical + Sentinel-1 SAR radar via Google Earth Engine with cascading date-range fallback",
                "5-layer caching: GEE (14d), SAR (14d), OSM (7d), news (7d), scraper (24h) — second run finishes in a fraction of the time",
                "Parallel scoring: ThreadPoolExecutor processes 4 regions concurrently, cutting scoring from ~50 min to ~15 min",
                "News week-over-week rate of change: compares article counts between runs, feeds surging coverage into momentum multiplier",
                "Production IaC: Terraform (5 modules, ~70 AWS resources), Docker multi-stage build, Step Functions orchestration",
            ],
            codeSnippet: `# Parallel scoring with week-over-week news momentum
prev_news = self._load_previous_news_counts()

with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {
        executor.submit(
            self._score_single_region, region, prev_news
        ): region['region_name']
        for region in monitoring_regions
    }
    for future in as_completed(futures):
        result = future.result(timeout=180)
        if result:
            scored.append(result)

# News WoW feeds into momentum
if current_articles > prev_articles:
    wow_ratio = current / prev
    momentum_boost = min(1.08, 1.0 + (wow_ratio - 1) * 0.05)`,
            deepDive: "Each region is scored through a multi-factor pipeline: satellite change detection identifies construction activity, OSM Overpass queries measure infrastructure proximity with distance decay, Lamudi web scraping provides live market prices fed into RVI (Relative Value Index) calculations, and news article sentiment from Jakarta Post, Kompas, and Antara generates catalyst multipliers. The final score determines BUY/WATCH/PASS classifications, rendered into a PDF decision matrix with financial projections and emailed weekly.",
            githubLink: "https://github.com/MIFUNEKINSKi/CloudClearingAPI",
        },
        {
            name: "VitalStream",
            tagline: "Healthcare data pipeline — HL7 FHIR clinical data to OMOP Common Data Model",
            accent: "#FF9900",
            metrics: [
                { value: "FHIR", label: "Source Format" },
                { value: "OMOP", label: "Target CDM" },
                { value: "PySpark", label: "Engine" },
                { value: "IaC", label: "Terraform" },
            ],
            techStack: ["AWS Glue", "Athena", "S3", "Step Functions", "PySpark", "OMOP CDM", "HL7 FHIR", "Terraform"],
            architecture: [
                "Ingests HL7 FHIR Bundle JSON into staging S3 buckets, partitioned by resource type and date",
                "AWS Glue PySpark jobs map FHIR resources (Patient, Condition, Observation) to OMOP tables (person, condition_occurrence, measurement)",
                "Vocabulary mapping across SNOMED-CT, ICD-10, LOINC, and RxNorm using OMOP concept tables",
                "Step Functions orchestrates the ETL DAG with retry logic and SNS failure alerts",
                "Athena provides serverless SQL over the OMOP Parquet data lake",
            ],
            codeSnippet: `# FHIR Condition → OMOP condition_occurrence
def map_condition(fhir_bundle, concept_lookup):
    conditions = extract_resources(
        fhir_bundle, "Condition"
    )
    return conditions.withColumn(
        "condition_concept_id",
        map_snomed_to_omop(
            col("code.coding.code"),
            concept_lookup
        )
    ).select(
        col("subject.reference").alias("person_id"),
        col("condition_concept_id"),
        col("onsetDateTime").alias("condition_start_date"),
        col("clinicalStatus").alias("condition_status")
    )`,
            deepDive: "VitalStream solves a core healthcare data engineering challenge: making heterogeneous clinical data queryable for analytics. Raw HL7 FHIR data from EHR systems is deeply nested JSON with inconsistent coding systems. The pipeline normalizes this into OMOP CDM, the standard analytical model used by OHDSI research networks, enabling cross-institutional cohort studies and outcomes analysis.",
            githubLink: "https://github.com/MIFUNEKINSKi/VitalStream",
        },
        {
            name: "CodeMark",
            tagline: "Save, share, and discover code snippets with auto-generated documentation links",
            accent: "#2196F3",
            metrics: [
                { value: "MERN", label: "Full Stack" },
                { value: "481", label: "Commits" },
                { value: "IDE", label: "CodeMirror" },
                { value: "API", label: "Google Search" },
            ],
            techStack: ["React", "Redux", "Node.js", "Express", "MongoDB", "CodeMirror", "Google Search API", "Highlight.js"],
            architecture: [
                "Multi-step note creation: paste code, auto-detect language via Highlight.js, extract keywords, fetch relevant docs via Google Custom Search API",
                "Embedded CodeMirror 6 IDE with syntax highlighting, autocomplete, and dark theme for a native developer experience",
                "MongoDB document model with user/note/comment clusters, custom RESTful and non-RESTful routes for likes, tags, and cascading deletes",
                "Export any CodeMark as a high-res PNG (2x viewport resolution) via dom-to-image, shareable outside the platform",
                "Highlight-to-comment: select code text to open a contextual comment modal referencing the exact snippet",
            ],
            codeSnippet: `// Keyword extraction → Google Custom Search
const fetchResources = async (keywords, language) => {
  const queries = keywords.map(kw =>
    \`\${kw} \${language} documentation example\`
  );
  const results = await Promise.all(
    queries.map(q =>
      axios.get('/api/search', { params: { q } })
    )
  );
  return results.flatMap(r => r.data.items);
};

// Highlight code to comment
onTextSelect={(selection) => {
  dispatch(openCommentModal({
    selectedCode: selection.text,
    lineRange: [selection.start, selection.end]
  }));
}}`,
            codeSnippetSecondary: `// High-res PNG export (2×) for sharing outside the app
const exportNoteCard = async (rootNode) => {
  const scale = 2;
  const dataUrl = await domtoimage.toPng(rootNode, {
    width: rootNode.offsetWidth * scale,
    height: rootNode.offsetHeight * scale,
    style: {
      transform: \`scale(\${scale})\`,
      transformOrigin: 'top left',
    },
  });
  triggerDownload(dataUrl, \`codemark-\${Date.now()}.png\`);
};`,
            demoMedia: {
                src: codeMarkDemoGif,
                alt: "Screen recording of CodeMark: editor, notes, and doc links",
                caption: "Demo: CodeMirror editor, saved CodeMarks, and fetched resources",
                width: 880,
                height: 495,
            },
            deepDive: "CodeMark solves a developer workflow gap: saving code snippets with context. Instead of bookmarking Stack Overflow links separately, you paste code and CodeMark auto-detects the language, extracts keywords, and fetches relevant documentation and discussions. Notes can be public (discoverable by others) or private, tagged for filtering, liked, and commented on with inline code references.",
            liveLink: "https://code-mark.herokuapp.com/#/",
            githubLink: "https://github.com/jacobbenowitz/code-mark",
        },
        {
            name: "AuteurFlix",
            tagline: "Full-stack auteur cinema platform with personalized collections",
            accent: "#E91E63",
            metrics: [
                { value: "React", label: "Frontend" },
                { value: "Rails", label: "Backend" },
                { value: "Redux", label: "State" },
                { value: "PG", label: "Database" },
            ],
            techStack: ["React", "Redux", "Ruby on Rails", "PostgreSQL", "JavaScript", "REST API"],
            architecture: [
                "React/Redux SPA with client-side routing and optimistic UI updates",
                "Ruby on Rails API backend with JWT authentication and session management",
                "PostgreSQL with ActiveRecord for curated film collections, watchlists, and user profiles",
                "RESTful API design with nested resource routes",
            ],
            codeSnippet: `// Redux thunk: fetch curated collection
export const fetchCollection = (directorId) =>
  async (dispatch) => {
    const res = await fetch(
      \`/api/directors/\${directorId}/films\`,
      { headers: authHeaders() }
    );
    const films = await res.json();
    dispatch(receiveFilms(films));
  };

// Rails: scoped film query
class Film < ApplicationRecord
  scope :by_director, ->(id) {
    where(director_id: id)
      .includes(:genres, :reviews)
      .order(year: :desc)
  }
end`,
            codeSnippetSecondary: `// React: genre rows with lazy-loaded backdrop art
const GenreLane = ({ genre, films }) => (
  <section className="genre-row">
    <h2>{genre.name}</h2>
    <div className="film-rail">
      {films.map((film) => (
        <FilmPoster
          key={film.id}
          film={film}
          onHover={() => dispatch(loadPreviewClip(film.id))}
        />
      ))}
    </div>
  </section>
);`,
            demoMedia: {
                src: auteurFlixDemoGif,
                alt: "Screen recording of AuteurFlix browsing auteur films and collections",
                caption: "Demo: Netflix-style rows, film detail, and curated auteur collections",
                width: 880,
                height: 495,
            },
            liveLink: "https://auteurflix.herokuapp.com/",
            githubLink: "https://github.com/MIFUNEKINSKi/AuteurFlix",
        },
    ];

    return (
        <>
            <div className="container projects-page">
                <div className="projects-scroll">
                    <h1>Projects</h1>
                    <p className="projects-intro">
                        Each card includes a live demo GIF where available. Expand for architecture notes and code samples.
                    </p>
                    <div className="projects-list">
                        {projects.map((project, idx) => (
                            <ProjectCard
                                key={idx}
                                project={project}
                                isExpanded={expandedIdx === idx}
                                onToggle={() => toggleExpand(idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Loader type="line-scale" />
        </>
    );
};

export default Projects;
