import OwnedPledges from "../components/OwnedPledges";
import OwnedProjects from "../components/OwnedProjects";
import useUser from "../hooks/use-user";
import { Link } from "react-router-dom";

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
    <div>
      <div>
        <h1>UserDetails</h1>
        <h2>Username: </h2>
        <p>{userDetails.username}</p>
        <h2>Email: </h2>
        <p> {userDetails.email}</p>
      </div>
      <div>
        <h1>Donations</h1>
        <OwnedPledges />
      </div>
      <div>
        <h1>Your Projects</h1>
        <OwnedProjects />
        <p>{<Link to="/projects">Start your campaign</Link>}</p>
        <p>{<Link to="/">Explore other projects</Link>}</p>
      </div>
    </div>
  );
}

export default UserDashboard;
