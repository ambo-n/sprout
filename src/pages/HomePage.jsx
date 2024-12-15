import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";
import banner from "../assets/banner.jpg";
import { Typewriter } from "react-simple-typewriter";
function HomePage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div>
        <img
          src="https://i.pinimg.com/originals/d9/f2/15/d9f21515b1e38d83e94fdbce88f623b6.gif"
          alt="loading"
        />
      </div>
    );
  }

  if (error) {
    alert(error.message);
  }

  return (
    <div>
      <div className="banner">
        <img
          src={banner}
          alt="A background image of a space with rassy mounds, wildflowers, skylights, and modern furniture."
        />
        <div className="banner-text">
          <h1>
            <Typewriter words={["Welcome to Sprout"]} typeSpeed={100} />
          </h1>
          <p>
            A crowdfunding platform for your next community conservation project
          </p>
        </div>
      </div>
      <div className="project-page">
        <h1>Featured projects</h1>
        <div id="project-list">
          {projects.map((projectData, key) => {
            return <ProjectCard key={key} projectData={projectData} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
