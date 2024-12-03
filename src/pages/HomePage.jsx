import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";
import banner from "../assets/banner.jpg";
function HomePage() {
  const { projects } = useProjects();

  return (
    <div>
      <div className="banner">
        <img src={banner} />
      </div>
      <div id="project-list">
        {projects.map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
