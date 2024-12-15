import { Link } from "react-router-dom";
import "./ProjectCard.css";
import useProject from "../hooks/use-project";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `project/${projectData.id}`;
  const { project, isLoading, error } = useProject(projectData.id);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    alert(error);
  }

  let pledgeAmountData = project.pledges.map((pledgeData) => {
    return pledgeData.amount;
  });

  let currentAmount = 0;

  for (let i = 0; i < pledgeAmountData.length; i++) {
    currentAmount += pledgeAmountData[i];
  }
  return (
    <div className="project-card">
      <div>
        <Link to={projectLink}>
          <img src={projectData.image} />
          <div className="progress-container">
            <progress
              id="progress-bar"
              value={currentAmount}
              max={projectData.goal}
              className="project-card-progress-bar"
            ></progress>
            <p>${currentAmount} raised</p>
          </div>
          <h3>{projectData.title}</h3>
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
