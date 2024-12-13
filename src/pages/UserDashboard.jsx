import OwnedPledges from "../components/OwnedPledges";
import OwnedProjects from "../components/OwnedProjects";
import useUser from "../hooks/use-user";
import { Link } from "react-router-dom";
import "./UserDashboard.css";
import dashboard from "../assets/dashboard.png";

function UserDashboard() {
  const userId = window.localStorage.getItem("user_id");
  const { userDetails, isLoading, error } = useUser(userId);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome back, {userDetails.username}</h1>
      <div className="start-exploring-container">
        <div>
          <h2>Explore other projects or start fundraising</h2>
        </div>
        <div className="start-exploring-container-left">
          <div className="start-exploring-container-items-left">
            {
              <Link to="/projects" className="btn-styling1">
                Start your campaign
              </Link>
            }
          </div>
          <div className="start-exploring-container-items-left">
            {
              <Link to="/" className="btn-styling2">
                Explore other projects
              </Link>
            }
          </div>
          <div>
            <img src={dashboard} alt="dashboard image" />
          </div>
        </div>
      </div>
      <div>
        <h1>Donations</h1>
        <OwnedPledges />
      </div>
      <div>
        <h1>Your Projects</h1>
        <OwnedProjects />
      </div>
    </div>
  );
}

export default UserDashboard;
