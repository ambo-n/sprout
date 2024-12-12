import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `project/${projectData.id}`;
  return (
    <div className="project-card">
      <div>
        <Link to={projectLink}>
          <img src={projectData.image} />
          <h3>{projectData.title}</h3>
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
