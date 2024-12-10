import { useState, useEffect } from "react";

import getPledges from "../api/get-pledges";

export default function usePledge() {
  const [pledge, setPledge] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getPledges()
      .then((pledgeData) => {
        setPledge(pledgeData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { pledge, isLoading, error };
}
