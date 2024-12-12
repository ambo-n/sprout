import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import "./ProjectPage.css";
import PledgeForm from "../components/PledgeForm";
import { useNavigate } from "react-router-dom";
// import ProgressBar from "../components/ProgressBar";

function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);

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
    return navigate("*");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/project/edit/" + id);
  };

  return (
    <div className="project">
      <h1>{project.title}</h1>
      <p>
        Created on:{" "}
        {new Date(project.date_created).toLocaleDateString("en-au", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p> Status: {project.is_open ? "Open" : "Closed"}</p>
      <button type="submit" onClick={handleSubmit}>
        Edit project detail
      </button>
      <div className="project-page-grid-container">
        <div className="project-detail">
          <img src={project.image} />
        </div>
        {/* <div>
          <ProgressBar />
        </div> */}
        <div>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
            <Map
              className="map"
              defaultCenter={{
                lat: parseFloat(project.latitude),
                lng: parseFloat(project.longitude),
              }}
              defaultZoom={13}
              mapId={import.meta.env.VITE_MAP_ID}
              reuseMaps={true}
              options={{
                gestureHandling: "cooperative",
              }}
            >
              <AdvancedMarker
                position={{
                  lat: parseFloat(project.latitude),
                  lng: parseFloat(project.longitude),
                }}
              >
                <Pin />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </div>
      </div>
      <div className="campaign-description">
        <h2>Campaign description</h2>
        <p>{project.description}</p>
      </div>
      <div className="pledge">
        <div>
          <PledgeForm />
        </div>
        <div className="pledges-container">
          <div className="pledge-list">
            <h2>Pledges:</h2>
            <div>
              <ul>
                {project.pledges.map((pledgeData, key) => {
                  if (pledgeData.anonymous) {
                    return (
                      <li key={key}>
                        ${pledgeData.amount} from {pledgeData.support}{" "}
                      </li>
                    );
                  } else {
                    return (
                      <li key={key}>
                        ${pledgeData.amount} from a secret supporter
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
