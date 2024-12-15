import usePledge from "../hooks/use-pledge";
import { Link } from "react-router-dom";
import "./OwnedPledges.css";

function OwnedPledges() {
  const userId = parseInt(window.localStorage.getItem("user_id"));
  const { pledge, isLoading, error } = usePledge();

  if (isLoading) {
    return <p>Fetching the data</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="owned-pledge-container ">
      <ul>
        {pledge.map((pledgeData, key) => {
          if (pledgeData.support === userId) {
            return (
              <li key={key}>
                You have donated ${pledgeData.amount} to{" "}
                {
                  <Link to={`/project/${pledgeData.project}`}>
                    {pledgeData.project_title}
                  </Link>
                }{" "}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default OwnedPledges;
