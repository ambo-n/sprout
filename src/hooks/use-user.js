import { useState, useEffect } from "react";

import getUser from "../api/get-user";

export default function useUser(userId) {
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getUser(userId)
      .then((user) => {
        setUserDetails(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [userId]);

  return { userDetails, isLoading, error };
}
