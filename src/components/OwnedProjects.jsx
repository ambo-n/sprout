import useUser from "../hooks/use-user";
import { Link, Outlet } from "react-router-dom";

function OwnedProjects() {
  const userId = window.localStorage.getItem("user_id");
  const { userDetails, isLoading, error } = useUser(userId);

  if (isLoading) {
    return (
      <div>
        <h2>Getting your info</h2>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {userDetails.owned_projects.map((ownedProjectData, key) => {
          return (
            <li key={key}>
              {
                <Link to={`/project/${ownedProjectData.id}`}>
                  {ownedProjectData.title}
                </Link>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OwnedProjects;
