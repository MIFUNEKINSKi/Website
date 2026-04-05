import "./index.scss";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPython, faAws, faDocker } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faSatelliteDish, faChartLine } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loaders";

const About = () => {
    const skillCategories = [
        {
            title: "Languages & Frameworks",
            skills: ["Python", "SQL", "PySpark", "JavaScript", "SAS", "React"]
        },
        {
            title: "Cloud & Infrastructure",
            skills: ["AWS (S3, Glue, Athena, ECS, Step Functions, Lambda)", "Terraform", "Docker", "GitHub Actions"]
        },
        {
            title: "Data Engineering",
            skills: ["ETL/ELT Pipelines", "dbt", "Web Scraping", "REST APIs", "JSONL / Parquet", "Data Quality"]
        },
        {
            title: "Specialized",
            skills: ["Google Earth Engine", "Geospatial (GeoPandas, Shapely)", "Satellite Imagery (Sentinel-1/2)", "OMOP CDM / HL7 FHIR"]
        },
    ];

    return (
        <div>
            <div className="container about-page">
                <div className="text-zone">
                    <h1>About me</h1>
                    <p>
                        I build data pipelines that turn messy, multi-source data into
                        actionable intelligence. My background spans healthcare analytics,
                        geospatial data processing, and satellite imagery — I'm drawn to
                        problems where the data is complex and the stakes are real.
                    </p>
                    <p>
                        Day to day, I work with <span className="technologies">Python, SQL,
                        AWS, Terraform, Docker, and dbt</span>. I've built production pipelines
                        that fuse satellite imagery with web-scraped market data, transform
                        clinical records between healthcare standards, and score investment
                        opportunities across 65 regions in real time.
                    </p>
                    <p>
                        I care about reliability — caching layers, retry logic, data validation,
                        and clear alerting. Good data engineering means the pipeline runs at 3 AM
                        on Sunday and you don't get paged.
                    </p>

                    <div className="skills-grid">
                        {skillCategories.map((cat, idx) => (
                            <div className="skill-category" key={idx}>
                                <h3>{cat.title}</h3>
                                <div className="skill-tags">
                                    {cat.skills.map((skill, i) => (
                                        <span key={i} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stage-cube-cont">
                    <div className="cubespinner">
                        <div className="face1">
                            <FontAwesomeIcon className="devicon" icon={faPython} color="#3776AB" />
                        </div>
                        <div className="face2">
                            <FontAwesomeIcon className="devicon" icon={faAws} color="#FF9900" />
                        </div>
                        <div className="face3">
                            <FontAwesomeIcon className="devicon" icon={faDocker} color="#2496ED" />
                        </div>
                        <div className="face4">
                            <FontAwesomeIcon className="devicon" icon={faDatabase} color="#336791" />
                        </div>
                        <div className="face5">
                            <FontAwesomeIcon className="devicon" icon={faSatelliteDish} color="#4CAF50" />
                        </div>
                        <div className="face6">
                            <FontAwesomeIcon className="devicon" icon={faChartLine} color="#ffd700" />
                        </div>
                    </div>
                </div>
            </div>
            <Loader type="line-scale"/>
        </div>
    )
}
export default About;
