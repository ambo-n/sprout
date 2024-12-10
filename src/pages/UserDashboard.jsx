import OwnedPledges from "../components/OwnedPledges";
import OwnedProjects from "../components/OwnedProjects";

function UserDashboard() {
  return (
    <div>
      <div>
        <h1>UserDetails</h1>
      </div>
      <div>
        <h1>Donations</h1>
        <OwnedPledges />
      </div>
      <div>
        <h1>Your Projects</h1>
        <OwnedProjects />
        <p>Start your compaign</p>
      </div>
    </div>
  );
}

export default UserDashboard;
