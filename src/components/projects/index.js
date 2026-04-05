import "./index.scss";
import React from 'react';
import Loader from "react-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
    const projects = [
        {
            name: "CloudClearingAPI",
            tagline: "Automated land investment pipeline — 65 regions, 5 data sources, weekly runs",
            highlights: [
                "Multi-source ETL: Sentinel-2 optical + Sentinel-1 SAR satellite imagery, live web scraping (94% coverage), OSM Overpass API (78% live), news sentiment, JSONL price archives",
                "Dual-sensor fusion pipeline: optical and radar change detection via Google Earth Engine with cascading date-range fallback",
                "65-region scoring engine: 4-tier market classification, RVI valuation, infrastructure proximity decay, momentum analysis",
                "Automated reporting: ranked PDF with decision matrix, financial projections, benchmark drift monitoring, auto-email delivery",
                "Production-ready: Docker multi-stage build, Terraform IaC (5 modules, ~70 AWS resources), Step Functions orchestration"
            ],
            techStack: ["Python", "Google Earth Engine", "AWS (ECS, Step Functions, S3)", "Terraform", "Docker", "OSM Overpass API", "Web Scraping", "Sentinel-1/2"],
            githubLink: "https://github.com/MIFUNEKINSKi/CloudClearingAPI",
            accent: "#4CAF50"
        },
        {
            name: "VitalStream",
            tagline: "Healthcare data pipeline — HL7 FHIR to OMOP CDM",
            highlights: [
                "Ingests HL7 FHIR clinical data into the OMOP Common Data Model for standardized analytics",
                "AWS Glue ETL jobs with PySpark for large-scale transformations",
                "Athena for serverless SQL querying over S3 data lakes",
                "Step Functions orchestration with automated lineage tracking",
                "Vocabulary mapping across SNOMED, ICD-10, and LOINC standards"
            ],
            techStack: ["AWS Glue", "Athena", "S3", "Step Functions", "PySpark", "OMOP CDM", "HL7 FHIR", "Terraform"],
            githubLink: "https://github.com/MIFUNEKINSKi/VitalStream",
            accent: "#FF9900"
        },
        {
            name: "Geospatial Investment Scorer",
            tagline: "Multi-source geospatial data aggregation platform",
            highlights: [
                "Aggregates satellite imagery, property listings, and infrastructure data",
                "Weighted scoring algorithm combining change detection, infrastructure proximity, and market liquidity",
                "Pulls from Google Earth Engine, OpenStreetMap, and Indonesian real estate APIs",
                "Generates corridor-level comparisons with configurable scoring weights"
            ],
            techStack: ["Python", "Google Earth Engine", "REST APIs", "GeoPandas", "Data Fusion", "Scoring Algorithms"],
            githubLink: "https://github.com/MIFUNEKINSKi/geospatial-investment-scorer",
            accent: "#2196F3"
        },
        {
            name: "AuteurFlix",
            tagline: "Full-stack Netflix clone for auteur cinema",
            highlights: [
                "Full-stack application with user authentication and profile management",
                "Built with React/Redux frontend and Ruby on Rails API backend",
                "PostgreSQL database with curated film collections and personalized playlists"
            ],
            techStack: ["React", "Redux", "Ruby on Rails", "PostgreSQL", "JavaScript"],
            liveLink: "https://auteurflix.herokuapp.com/",
            githubLink: "https://github.com/MIFUNEKINSKi/AuteurFlix",
            accent: "#E91E63"
        }
    ];

    return (
        <>
            <div className="container projects-page">
                <div className="projects-scroll">
                    <h1>Projects</h1>
                    <div className="projects-grid">
                        {projects.map((project, idx) => (
                            <div className="project-card" key={idx}>
                                <div className="card-accent" style={{ backgroundColor: project.accent }} />
                                <div className="card-content">
                                    <div className="card-header">
                                        <h2>{project.name}</h2>
                                        <p className="tagline">{project.tagline}</p>
                                    </div>
                                    <ul className="highlights">
                                        {project.highlights.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    <div className="card-footer">
                                        <div className="tech-chips">
                                            {project.techStack.map((tech, i) => (
                                                <span className="chip" key={i}>{tech}</span>
                                            ))}
                                        </div>
                                        <div className="card-links">
                                            <a href={project.githubLink} target="_blank" rel="noreferrer">
                                                <FontAwesomeIcon icon={faGithub} /> GitHub
                                            </a>
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" rel="noreferrer">
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Live
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Loader type="line-scale" />
        </>
    );
};

export default Projects;
