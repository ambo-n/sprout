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

function ProjectPage() {
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
    return <p>{error.message}</p>;
  }

  // console.log(new Date(project.date_created).toDateString());

  return (
    <div>
      <h2>{project.title}</h2>
      <h3>
        Created at:{" "}
        {new Date(project.date_created).toLocaleDateString("en-au", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </h3>
      <h3>{`Status: ${project.is_open}`}</h3>

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
              gestureHandling: "greedy",
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
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledgeData, key) => {
          if (pledgeData.anonymous === true) {
            return (
              <li key={key}>
                ${pledgeData.amount} from {pledgeData.support}{" "}
              </li>
            );
          } else {
            return (
              <li key={key}>${pledgeData.amount} from a secret supporter</li>
            );
          }
        })}
      </ul>
      <div>
        <PledgeForm />
      </div>
    </div>
  );
}

export default ProjectPage;
