import usePledge from "../hooks/use-pledge";

function OwnedPledges() {
  const userId = parseInt(window.localStorage.getItem("user_id"));
  const { pledge, isLoading, error } = usePledge();
  return (
    <div>
      <ul>
        {pledge.map((pledgeData, key) => {
          if (pledgeData.support === userId) {
            return <li key={key}>{pledgeData.project}</li>;
          }
        })}
      </ul>
    </div>
  );
}

export default OwnedPledges;
