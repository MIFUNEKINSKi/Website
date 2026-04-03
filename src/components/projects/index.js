import "./index.scss";
import React from 'react';

import Loader from "react-loaders";
import AuteurFLix from "../../assets/images/AuteurFlix1.gif"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Projects = () => {
    const [currentProject, setCurrent] = useState(0);

    const projects = [
        {
            name: "CloudClearingAPI",
            description: <p>A satellite-powered investment scoring pipeline that monitors <span className="technologies">65 regions across Indonesia</span> for land development opportunities. Ingests Sentinel-2 optical and Sentinel-1 SAR radar imagery via <span className="technologies">Google Earth Engine</span>, fuses with real estate listings (Lamudi, 99.co), infrastructure data (OpenStreetMap), and news sentiment. Outputs automated PDF reports with a ranked decision matrix, financial projections, and confidence scores. Features <span className="technologies">dbt data models, JSONL price history tracking, momentum analysis</span>, and weekly cron-based monitoring with email alerts.</p>,
            techStack: "Python, Google Earth Engine, dbt, PostgreSQL, Sentinel-1/2, OSM Overpass API, FPDF2, Gmail SMTP",
            githubLink: "https://github.com/MIFUNEKINSKi/CloudClearingAPI"
        },
        {
            name: "VitalStream",
            description: <p>A production-grade healthcare data pipeline that ingests <span className="technologies">HL7 FHIR clinical data</span> into the <span className="technologies">OMOP Common Data Model</span> for standardized analytics. Built on <span className="technologies">AWS Glue ETL jobs</span> with PySpark for large-scale transformations, <span className="technologies">Athena</span> for serverless SQL querying over S3 data lakes, and Step Functions for orchestration. Includes data quality checks, vocabulary mapping (SNOMED, ICD-10, LOINC), and automated lineage tracking across the ingestion pipeline.</p>,
            techStack: "AWS Glue, Athena, S3, Step Functions, PySpark, OMOP CDM, HL7 FHIR, Terraform",
            githubLink: "https://github.com/MIFUNEKINSKi/VitalStream"
        },
        {
            name: "Geospatial Investment Scorer",
            description: <p>A multi-source geospatial data platform that aggregates <span className="technologies">satellite imagery, property listings, and infrastructure data</span> to score investment corridors. Pulls from Google Earth Engine, OpenStreetMap, and Indonesian real estate APIs. Implements a weighted scoring algorithm combining <span className="technologies">satellite change detection, infrastructure proximity, market liquidity</span>, and price momentum. Generates corridor-level comparisons with configurable scoring weights and visual outputs.</p>,
            techStack: "Python, Google Earth Engine, REST APIs, GeoPandas, Scoring Algorithms, Data Fusion",
            githubLink: "https://github.com/MIFUNEKINSKi/geospatial-investment-scorer"
        },
        {
            img: AuteurFLix,
            name: "AuteurFlix",
            description: <p>A full-stack clone of Netflix focused on auteur cinema. Built with <span className="technologies">React, Redux, Ruby on Rails, and PostgreSQL.</span> Users can create profiles, browse curated collections of auteur films, and build personalized playlists.</p>,
            techStack: "React, Redux, Ruby on Rails, PostgreSQL, JavaScript",
            liveLink: "https://auteurflix.herokuapp.com/",
            githubLink: "https://github.com/MIFUNEKINSKi/AuteurFlix"
        }
    ]

    const handleClick = (direction) => {
    direction === "left"
      ? setCurrent(currentProject > 0 ? currentProject - 1 : projects.length - 1)
      : setCurrent(currentProject < projects.length - 1 ? currentProject + 1 : 0);
    };

    return (
    <>
        <div className="container projects-page">
                <h1>
                    Projects
                </h1>
                <div className="carousel" style={{ transform: `translateX(-${currentProject * 100}vw)` }}>
                    {projects.map((project, idx) => (
                        <div className="project-container" key={idx}>
                        <div className={`project ${!project.img ? 'no-image' : ''}`}>
                            <div className="left">
                                <div className="left-container">
                                    <div>
                                        <h2>{project.name}</h2>
                                        {project.description}
                                        {project.techStack && (
                                            <p className="tech-stack-label">
                                                <span className="technologies">{project.techStack}</span>
                                            </p>
                                        )}
                                    </div>
                                    <div className="left-links">
                                        {project.liveLink && (
                                            <a href={project.liveLink} className="flat-button">
                                                Live Site
                                            </a>
                                        )}
                                        <a href={project.githubLink} className="flat-button">
                                            Github
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {project.img && (
                                <div className="right">
                                    <img src={project.img} alt={project.name}></img>
                                    <div className="right-links">
                                        {project.liveLink && (
                                            <a href={project.liveLink} className="flat-button">
                                                Live Site
                                            </a>
                                        )}
                                        <a href={project.githubLink} className="flat-button">
                                            Github
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    ))}
                </div>
                <FontAwesomeIcon className="arrow left" icon={faAngleLeft} color="#FFF" onClick={() => handleClick("left")}/>
                <FontAwesomeIcon className="arrow right" icon={faAngleRight} color="#FFF" onClick={() => handleClick("right")}/>
      </div>
      <Loader type="line-scale"/>
    </>
    )
}
export default Projects;
