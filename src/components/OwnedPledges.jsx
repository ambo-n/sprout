import usePledge from "../hooks/use-pledge";
import { Link } from "react-router-dom";
import "./OwnedPledges.css";

function OwnedPledges() {
  const userId = parseInt(window.localStorage.getItem("user_id"));
  const { pledge, isLoading, error } = usePledge();

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
                    {pledgeData.project}
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
