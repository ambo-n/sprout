import { useState, useEffect } from "react";
import getPledges from "../api/get-pledges";

export default function usePledge() {
  const [pledge, setPledge] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getPledges()
      .then((pledgeData) => setPledge(pledgeData))
      .catch((error) => setError(error));
  }, []);

  return { pledge, error };
}
