// Shared portfolio data. Project copy lifted verbatim from the production
// codebases; engineering owns the substance, design only re-styles.

import codeMarkDemoGif from "../assets/images/code mark 1.gif";
import auteurFlixDemoGif from "../assets/images/AuteurFlix1.gif";

export const PROJECTS = [
    {
        id: "cloudclearing",
        num: "01",
        name: "CloudClearingAPI",
        accent: "var(--proj-cloud)",
        tagline: "Automated land investment intelligence pipeline for 65 Indonesian regions.",
        metrics: [
            { value: "65", label: "Regions" },
            { value: "5", label: "Data Sources" },
            { value: "94%", label: "Live Market" },
            { value: "~4×", label: "Parallel Speedup" },
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
        codeFile: "scoring/pipeline.py",
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
        result = future.result(timeout=int(os.environ.get(
            "CC_SCORE_REGION_TIMEOUT_SEC", "1200")))
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
        id: "humn",
        num: "02",
        name: "HUMN",
        accent: "var(--proj-humn)",
        tagline: "Behavior-change health app — secure biometrics ingest, event-driven scoring, AWS serverless backend.",
        metrics: [
            { value: "9", label: "Lambdas" },
            { value: "~1s", label: "Ingest → Score" },
            { value: "GSI", label: "Sparse Index" },
            { value: "IaC", label: "Terraform" },
        ],
        techStack: ["AWS Lambda", "API Gateway v2", "DynamoDB", "DDB Streams", "S3", "Cognito", "Terraform", "CloudWatch", "k6", "Python", "TypeScript"],
        architecture: [
            "Product loop: biometric and behavior events → API Gateway v2 → JSON-schema validator Lambda → DynamoDB user_state → scorer Lambda → score-read API",
            "Event-driven ingest: HealthKit observer → API Gateway v2 → JSON-schema validator Lambda → async InvocationType=Event fan-out to scorer Lambda; upload-to-score lag drops from 15-min cron to ~1s",
            "Cold archive: DynamoDB Streams → exporter Lambda → S3 partitioned JSONL, lifecycle-tiered to IA/Glacier",
            "Sparse GSI on user_state (active_partition + last_event_ts, KEYS_ONLY projection) replaces table-Scan with active-only Query — avoids ~$30/mo DDB cost regression at 10k users",
            "Security model: Cognito/JWT-authenticated API routes, least-privilege IAM, and privacy-conscious data boundaries between ingest, scoring, archive, and read paths",
            "Per-user async-Invoke fan-out from cron breaks past Lambda's 15-min ceiling for sustained 1k-user concurrency",
            "Observability: AWS Budget at $50/mo with 80%/100% alarms, per-Lambda CloudWatch metric filters routed to a single SNS topic — silent IAM-denial regressions surface within minutes",
            "k6 load harness: ramp+hold+rampdown profile (100 VUs / 5min), p95/p99 thresholds on ingest + score-read, run-over-run CSV deltas",
        ],
        codeFile: "lambdas/validator/handler.py",
        codeSnippet: `# Validator → scorer async fan-out
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
        codeFileSecondary: "lambdas/scorer/handler.py",
        codeSnippetSecondary: `# Active-users sparse GSI replaces table-Scan
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
        deepDive: "HUMN is the clearest expression of the direction I am pushing toward: healthcare-adjacent product engineering backed by reliable data systems. The backend uses schema-validated ingest at the edge, asynchronous Lambda fan-out so the writer never waits on scoring, DynamoDB Streams driving a cold-archive exporter to S3, and a sparse GSI that swapped a table-Scan for an active-users-only Query before user count made the Scan unaffordable. Production-readiness work includes Cognito/JWT access control, least-privilege IAM, per-user fan-out from cron to bypass Lambda's 15-min ceiling, AWS Budget + CloudWatch error-metric alarms wired to SNS, and a k6 load-test harness with run-over-run CSV deltas.",
        appStoreLink: "https://apps.apple.com/us/app/humn-ancestral-reset/id6763772001",
        privateNote: "Source private (App Store product) — walkthrough on request",
    },
    {
        id: "vitalstream",
        num: "03",
        name: "VitalStream",
        accent: "var(--proj-vital)",
        tagline: "Healthcare data pipeline — HL7 FHIR clinical data to OMOP Common Data Model.",
        metrics: [
            { value: "FHIR", label: "Source" },
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
        codeFile: "glue/fhir_to_omop.py",
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
        id: "codemark",
        num: "04",
        name: "CodeMark",
        accent: "var(--proj-cmark)",
        tagline: "Save, share, and discover code snippets with auto-generated documentation links.",
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
        codeFile: "client/util/resources.js",
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
        codeFileSecondary: "client/util/export.js",
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
            caption: "Demo · CodeMirror editor, saved CodeMarks, and fetched resources",
            width: 880,
            height: 495,
        },
        deepDive: "CodeMark solves a developer workflow gap: saving code snippets with context. Instead of bookmarking Stack Overflow links separately, you paste code and CodeMark auto-detects the language, extracts keywords, and fetches relevant documentation and discussions. Notes can be public (discoverable by others) or private, tagged for filtering, liked, and commented on with inline code references.",
        githubLink: "https://github.com/jacobbenowitz/code-mark",
    },
    {
        id: "auteurflix",
        num: "05",
        name: "AuteurFlix",
        accent: "var(--proj-aflix)",
        tagline: "Netflix-style streaming UI — TypeScript/React, Rails API, TMDB-enriched catalog.",
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
            "JWT/session auth, multi-profile accounts, genre rows, search, and My List — same product flow as the original streaming clone",
        ],
        codeFile: "frontend/store/api.ts",
        codeSnippet: `// Redux Toolkit thunks → typed Rails JSON
import * as MovieAPI from '../util/movie_api_util';

export const fetchMovies = createAsyncThunk(
  'movies/fetchAll',
  MovieAPI.fetchMovies
);

export const fetchRecommendations = createAsyncThunk(
  'movies/fetchRecommendations',
  MovieAPI.fetchRecommendations
);`,
        codeFileSecondary: "app/services/tmdb_service.rb",
        codeSnippetSecondary: `# Rails: enrich catalog from TMDB
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
            caption: "Demo · Streaming-style rows, film detail, and curated collections",
            width: 880,
            height: 495,
        },
        deepDive: "The app has been modernized on the client: JavaScript React gave way to TypeScript with explicit API types, Redux Toolkit for thunks and slices, and Webpack 5 for bundling. On the server, a TmdbService plus rake tasks (e.g. tmdb:sync) pull ratings, posters, and backdrops from TMDB so the catalog stays aligned with industry metadata while Rails continues to own auth, profiles, and My List.",
        liveLink: "https://auteurflix-0vvx.onrender.com/#/browse",
        githubLink: "https://github.com/MIFUNEKINSKi/AuteurFlix",
    },
];

export const SKILL_CATEGORIES = [
    {
        num: "01",
        title: "Statistical Programming & Data",
        skills: ["SAS", "Python", "SQL", "R", "Clinical Data", "QC Validation", "Analysis-Ready Datasets", "Reproducible Outputs"],
    },
    {
        num: "02",
        title: "Cloud & Integration",
        skills: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "Glue / Athena", "Step Functions", "Cognito", "CloudWatch", "Terraform", "Docker", "GitHub Actions"],
    },
    {
        num: "03",
        title: "Data Systems",
        skills: ["ETL/ELT Pipelines", "Event-Driven Architectures", "Schema Validation", "Data Quality", "REST APIs", "JSONL / Parquet", "dbt-Style Modeling", "Observability"],
    },
    {
        num: "04",
        title: "AI & Product Adjacent",
        skills: ["AI Integration", "LLM Workflows", "Behavioral Scoring", "Health Data Products", "OMOP CDM / HL7 FHIR", "Geospatial Analytics"],
    },
];
