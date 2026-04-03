import "./index.scss";
import React from 'react';

import { useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPython, faAws, faDocker } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faSatelliteDish, faChartLine } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loaders";

const About = () => {

    useEffect(() => {
        setTimeout(() => {
        }, 3000)
    }, [])

    return (
        <div>
            <div className="container about-page">
                <div className="text-zone">
                    <h1>
                        About me
                    </h1>
                    <p>
                        I am a data engineer with a background in statistical programming
                        and healthcare analytics. I build data pipelines that ingest from
                        multiple sources, transform and score data, and deliver actionable
                        insights through automated reports and dashboards.
                    </p>
                    <p align="LEFT">
                        I have experience with <span className="technologies">Python, SQL,
                        AWS (Glue, Athena, S3, Lambda, Step Functions), dbt, Google Earth Engine,
                        PostgreSQL, Docker</span>, and <span className="technologies">React.</span> I
                        specialize in ETL pipelines, geospatial data processing, satellite imagery
                        analysis, and data quality frameworks.
                    </p>
                    <p>
                        Outside of engineering, I love traveling, trying new cuisines,
                        Shakespeare, movies, and my beautiful girlfriend and dog!
                    </p>
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
