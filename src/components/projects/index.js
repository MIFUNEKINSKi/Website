import "./index.scss";
import Loader from "react-loaders";
import AuteurFLix from "../../assets/images/auteurflix gif.gif"
import CryptoCity from "../../assets/images/CryptoCity.gif"
import CodeMarkDemo from "../../assets/images/code mark 1.gif"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Projects = () => {
    const [currentProject, setCurrent] = useState(0);

    const projects = [
        {
            img: AuteurFLix,
            name: "AuteurFlix",
            description: <p>AuteurFLix is a full stack clone of the popular media streaming service, NetFlix. The application was built using <span className="technologies">React, Redux, Javascript, Ruby, Rails, and PostgreSQL. </span>
                                    Using AuteurFLix, users are able to create profiles, and playlists of their favorite Auteur films.</p>,
            liveLink: "https://auteurflix.herokuapp.com/",
            githubLink: "https://github.com/MIFUNEKINSKi/AuteurFlix"
        },
        {
            img: CodeMarkDemo,
            name: "CodeMark",
            description: <p>CodeMark is a tool that allows you to save, share, and discover code notes, or CodeMarks.CodeMarks can be methods, functions, algorithms, etc.in a variety of languages.Automatically, you’ll get links to relevant documentation, examples, and discussions related to keywords of your choice. <span className="technologies">React, Redux, Javascript, NodeJS, Express</span>, and <span className="technologies">MongoDB.</span>This application leverages the use of <span className="technologies">RESTful routes</span> to implement <span className="technologies">CRUD functionality</span> and allow users to dynamically interact with the application and with other users.</p>,
            liveLink: "https://code-mark.herokuapp.com/#/",
            githubLink: "https://github.com/jacobbenowitz/code-mark"
        },
          {
            img: CryptoCity,
            name: "Crypto City",
              description: <p>This application provides an interactive Crypto dashboard to visualize all things crypto, find the latest news, and look at chart data to look at history of coins over time.</p>,
              liveLink: "https://cryptocityapp.netlify.app/",
              githubLink: "https://github.com/MIFUNEKINSKi/CryptoCity"
        }
    ]

    const handleClick = (direction) => {
    direction === "left"
      ? setCurrent(currentProject > 0 ? currentProject - 1 : 2)
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
                        <div className="project">
                            <div className="left">
                                <div className="left-container">
                                    <div>
                                        <h2>{project.name}</h2>
                                        {project.description}
                                    </div>
                                    <div className="left-links">
                                        <a href={project.liveLink} className="flat-button">
                                            Live Site
                                        </a>
                                        <a href={project.githubLink} className="flat-button">
                                            Github
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <img src={project.img}></img>
                                    <div className="right-links">
                                        <a href={project.liveLink} className="flat-button">
                                            Live Site
                                        </a>
                                        <a href={project.githubLink} className="flat-button">
                                            Github
                                        </a>
                                    </div>
                            </div>
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