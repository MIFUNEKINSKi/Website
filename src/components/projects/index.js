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

const ProjectCard = ({ project, isExpanded, onToggle }) => {
    const onExpandKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
        }
    };

    return (
    <div className={`project-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="card-accent" style={{ backgroundColor: project.accent }} />
        <div className="card-content">
            <div
                className="card-expand-zone"
                onClick={onToggle}
                onKeyDown={onExpandKeyDown}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${project.name}`}
            >
                <div className="card-header">
                    <div className="header-text">
                        <h2>{project.name}</h2>
                        <p className="tagline">{project.tagline}</p>
                    </div>
                    <span className="expand-btn" aria-hidden="true">
                        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                    </span>
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

                {!isExpanded && (
                    <p className="expand-hint">
                        Click this block (or press Enter) for architecture, code samples, and technical notes.
                    </p>
                )}
            </div>

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
};

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
                "Parallel scoring: ThreadPoolExecutor (configurable workers, default 2) cuts full-run scoring time versus single-threaded",
                "News week-over-week rate of change: compares article counts between runs, feeds surging coverage into momentum multiplier",
                "Production IaC: Terraform (6 modules: network, data lake, security, compute, monitoring, Step Functions), Docker multi-stage build, weekly ECS orchestration",
                "Resilient OSM / Overpass: throttled global requests, connect+read timeouts, mirror rotation, optional cost-aware AWS (no NAT) for portfolio dev",
            ],
            codeSnippet: `# Parallel scoring with week-over-week news momentum
prev_news = self._load_previous_news_counts()
max_workers = max(1, min(
    int(os.environ.get("CC_SCORING_MAX_WORKERS", "2")),
    len(monitoring_regions),
))

with ThreadPoolExecutor(max_workers=max_workers) as executor:
    futures = {
        executor.submit(
            self._score_single_region, region, prev_news
        ): region['region_name']
        for region in monitoring_regions
    }
    for future in as_completed(futures):
        result = future.result(timeout=int(os.environ.get("CC_SCORE_REGION_TIMEOUT_SEC", "1200")))
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
            name: "HUMN",
            tagline: "Event-driven biometrics platform — HealthKit ingest, async Lambda fan-out, DynamoDB sparse GSI",
            accent: "#7C3AED",
            metrics: [
                { value: "9", label: "Lambdas" },
                { value: "~1s", label: "Ingest→Score Lag" },
                { value: "GSI", label: "Sparse Index" },
                { value: "IaC", label: "Terraform" },
            ],
            techStack: ["AWS Lambda", "API Gateway v2", "DynamoDB", "DDB Streams", "S3", "Cognito", "Terraform", "CloudWatch", "k6", "Python", "TypeScript"],
            architecture: [
                "Event-driven ingest: HealthKit observer → API Gateway v2 → JSON-schema validator Lambda → async InvocationType=Event fan-out to scorer Lambda; upload-to-score lag drops from 15-min cron to ~1s",
                "Cold archive: DynamoDB Streams → exporter Lambda → S3 partitioned JSONL, lifecycle-tiered to IA/Glacier",
                "Sparse GSI on user_state (active_partition + last_event_ts, KEYS_ONLY projection) replaces table-Scan with active-only Query — avoids ~$30/mo DDB cost regression at 10k users",
                "Per-user async-Invoke fan-out from cron breaks past Lambda's 15-min ceiling for sustained 1k-user concurrency",
                "Observability: AWS Budget at $50/mo with 80%/100% alarms, per-Lambda CloudWatch metric filters (?ERROR ?Exception ?Traceback) routed to a single SNS topic — silent IAM-denial regressions surface within minutes",
                "k6 load harness: ramp+hold+rampdown profile (100 VUs / 5min), p95/p99 thresholds on ingest + score-read, run-over-run CSV deltas",
            ],
            codeSnippet: `# Validator → scorer async fan-out
# (lambdas/validator/handler.py)
def handler(event, _ctx):
    body = json.loads(event["body"])
    validate(body, BIOMETRICS_SCHEMA)

    sub = _user_sub_from_jwt(event)
    _persist_batch(sub, body["samples"])
    _upsert_user_metadata(  # writes active_partition for sparse GSI
        sub,
        last_event_ts=now_ms(),
        timezone=body.get("timezone"),
    )

    # Best-effort fan-out: durable row already written;
    # cron stays armed as the floor.
    try:
        LAMBDA.invoke(
            FunctionName=SCORER_FN,
            InvocationType="Event",
            Payload=json.dumps({"sub": sub}),
        )
    except ClientError:
        pass  # cron picks up the next pass

    return {"statusCode": 202}`,
            codeSnippetSecondary: `# Active-users sparse GSI replaces table-Scan
# (lambdas/scorer/handler.py — cron entrypoint)
def _users_with_recent_events():
    pages = DDB.get_paginator("query").paginate(
        TableName=STATE_TABLE,
        IndexName="active-users-by-last-event",
        KeyConditionExpression=Key("active_partition").eq("ACTIVE"),
        ProjectionExpression="sub",
    )
    for page in pages:
        for item in page["Items"]:
            yield item["sub"]

# Per-user async-Invoke breaks past the 15-min ceiling
for sub in _users_with_recent_events():
    LAMBDA.invoke(
        FunctionName=SELF_FN,
        InvocationType="Event",
        Payload=json.dumps({"sub": sub}),
    )`,
            deepDive: "HUMN's backend is the kind of event-driven AWS architecture you'd expect in a small-team production system. Schema-validated ingestion at the edge, asynchronous Lambda fan-out so the writer never waits on the scorer, DynamoDB Streams driving a cold-archive exporter to S3 (partitioned JSONL, lifecycle-tiered to IA/Glacier), and a sparse GSI that swapped a table-Scan for an active-users-only Query before user count made the Scan unaffordable. Production-readiness work: per-user fan-out from cron to bypass Lambda's 15-min ceiling, AWS Budget + CloudWatch error-metric alarms wired to SNS, and a k6 load-test harness with run-over-run CSV deltas. Nine Lambdas and an iOS client share a single Terraform-defined API Gateway v2 surface; a 100-point evolutionary scoring engine across ten components applies weight-shuffle re-normalization when any signal is missing.",
            githubLink: "https://github.com/MIFUNEKINSKi/HUMN",
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
                "Ingests HL7 FHIR R4 Bundle JSON (Patient, Encounter, Observation) into S3 landing zone with Lambda validation",
                "AWS Glue PySpark jobs map FHIR resources to OMOP CDM v5.4 tables (person, visit_occurrence, measurement) using native Spark ops — explode, broadcast joins, StructType enforcement",
                "LOINC-to-OMOP vocabulary lookup maps six vital signs (heart rate, blood pressure, temperature, respiratory rate, O2 saturation) to standardized concept_ids",
                "Step Functions orchestrates the pipeline: FHIR-to-OMOP transform → data quality checks (null, range, referential integrity) → Glue Crawler catalog update",
                "Athena provides serverless SQL over the OMOP Parquet data lake via Glue Data Catalog",
            ],
            codeSnippet: `# FHIR Observation → OMOP measurement (PySpark)
def map_to_measurement(spark, observations_df,
                       person_df, visit_df):
    loinc_lookup = _build_lookup_df(
        spark, LOINC_TO_OMOP,
        "loinc_code", "measurement_concept_id"
    )
    return (
        obs_with_refs
        .join(broadcast(person_lookup),
              on="patient_fhir_id", how="inner")
        .join(broadcast(loinc_lookup),
              on="loinc_code", how="left")
        .select(
            col("person_id"),
            col("measurement_concept_id"),
            to_date("effective_datetime")
                .alias("measurement_date"),
            col("value").cast(FloatType())
                .alias("value_as_number"),
        )
    )`,
            deepDive: "VitalStream solves a core healthcare data engineering challenge: making heterogeneous clinical data queryable for analytics. Raw HL7 FHIR R4 data from EHR systems is deeply nested JSON with varying coding systems. The pipeline normalizes this into OMOP CDM v5.4, the standard analytical model used by OHDSI research networks, with automated data quality gates that validate null checks, clinically plausible ranges, and referential integrity before data reaches the curated zone.",
            githubLink: "https://github.com/MIFUNEKINSKi/vitalstream-clinical-lake",
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
            tagline: "Netflix-style streaming UI — TypeScript/React, Rails API, TMDB-enriched catalog",
            accent: "#E91E63",
            metrics: [
                { value: "TS", label: "Frontend" },
                { value: "Rails", label: "API" },
                { value: "RTK", label: "State" },
                { value: "TMDB", label: "Metadata" },
            ],
            techStack: ["TypeScript", "React 18", "Redux Toolkit", "React Router", "Webpack 5", "Ruby on Rails", "PostgreSQL", "Active Storage", "TMDB API", "Render"],
            architecture: [
                "TypeScript frontend (tsx entry, ts-loader) with Redux Toolkit async thunks calling Rails JSON under /api",
                "Rails API serves movies, genres, list items, and profiles; PostgreSQL + Active Storage for thumbnails and trailers",
                "TmdbService syncs vote averages, poster/backdrop paths, and overviews from The Movie Database v3 (rake tmdb:sync)",
                "JWT/session auth, multi-profile accounts, genre rows, search, and My List — same product flow as the original Netflix clone",
            ],
            codeSnippet: `// Redux Toolkit thunks → typed Rails JSON (frontend/store/api.ts)
import * as MovieAPI from '../util/movie_api_util';

export const fetchMovies = createAsyncThunk(
  'movies/fetchAll',
  MovieAPI.fetchMovies
);

export const fetchRecommendations = createAsyncThunk(
  'movies/fetchRecommendations',
  MovieAPI.fetchRecommendations
);`,
            codeSnippetSecondary: `# Rails: enrich catalog from TMDB (app/services/tmdb_service.rb)
def sync_movie(movie)
  result = search_movie(movie.title, movie.year)
  return { status: :not_found } unless result
  details = movie_details(result["id"])
  movie.update!(
    tmdb_id: details["id"],
    tmdb_rating: details["vote_average"],
    tmdb_poster_path: details["poster_path"],
    tmdb_backdrop_path: details["backdrop_path"],
    tmdb_last_synced_at: Time.current
  )
  { status: :synced, tmdb_id: details["id"] }
end`,
            demoMedia: {
                src: auteurFlixDemoGif,
                alt: "Screen recording of AuteurFlix browsing auteur films and collections",
                caption: "Demo: Netflix-style rows, film detail, and curated auteur collections",
                width: 880,
                height: 495,
            },
            deepDive: "The app has been modernized on the client: JavaScript React gave way to TypeScript with explicit API types, Redux Toolkit for thunks and slices, and Webpack 5 for bundling. On the server, a TmdbService plus rake tasks (e.g. tmdb:sync) pull ratings, posters, and backdrops from TMDB so the catalog stays aligned with industry metadata while Rails continues to own auth, profiles, and My List.",
            liveLink: "https://auteurflix-0vvx.onrender.com/#/browse",
            githubLink: "https://github.com/MIFUNEKINSKi/AuteurFlix",
        },
    ];

    return (
        <>
            <div className="container projects-page">
                <div className="projects-scroll">
                    <h1>Projects</h1>
                    <p className="projects-intro">
                        Demo GIFs show the product in motion. Click each project card (title, metrics, or GIF) to open architecture, code, and technical notes — links below stay separate.
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
