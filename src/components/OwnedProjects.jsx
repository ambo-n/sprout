import useUser from "../hooks/use-user";
import { Link, Outlet } from "react-router-dom";
import deleteProject from "../api/delete-project";
import { useNavigate } from "react-router-dom";
import "./OwnedProjects.css";

function useConfirm(message, onConfirm, onAbort) {
  const confirm = (data) => {
    if (window.confirm(message)) {
      onConfirm(data);
    } else {
      onAbort();
    }
  };
  return confirm;
}

function OwnedProjects() {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("user_id");
  const { userDetails, isLoading, error } = useUser(userId);

  if (isLoading) {
    return (
      <div>
        <h2>Getting your projects</h2>
      </div>
    );
  }

  if (error) {
    console.log(error.message);
  }

  const handleDelete = (projectId) => {
    deleteProject(projectId)
      .then(() => {
        navigate(0);
      })
      .catch((error) => alert(error));
  };

  const handleAbort = () => {
    console.log("Phew, close one");
  };

  const confirmDelete = useConfirm(
    "Are you sure you want to delete this project?",
    handleDelete,
    handleAbort
  );

  return (
    <div className="owned-projects-container">
      <ul>
        <div className="owned-project-content">
          {userDetails.owned_projects.map((ownedProjectData, key) => {
            return (
              <li key={key}>
                {
                  <Link to={`/project/${ownedProjectData.id}`}>
                    {ownedProjectData.title}
                  </Link>
                }
                <span>
                  {
                    <Link to={`/project/edit/${ownedProjectData.id}`}>
                      Edit project detail
                    </Link>
                  }
                </span>
                <button
                  id={`${ownedProjectData.id}`}
                  onClick={() => confirmDelete(ownedProjectData.id)}
                >
                  Delete Project
                </button>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}

export default OwnedProjects;
