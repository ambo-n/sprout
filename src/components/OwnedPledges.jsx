import usePledge from "../hooks/use-pledge";

function OwnedPledges() {
  const userId = window.localStorage.getItem("user_id");
  const { pledge, error } = usePledge();
  return (
    <div>
      <ul>
        {pledge.map((pledgeData, key) => {
          return <li key={key}>{pledgeData.support}</li>;
        })}
      </ul>
    </div>
  );
}

export default OwnedPledges;
