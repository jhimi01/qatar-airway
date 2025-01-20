import { useState, useEffect } from "react";
import axios from "axios";
import { useCookie } from "./useCookie";

export default function useLoggedInUser() {
  const [user, setUser] = useState(null); // user data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error handling
  const [refetch, setRefetch] = useState(false); // refetch state
  const { getCookie } = useCookie({ key: "Token", days: 7 });
  const token = getCookie();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null); 
      try {
        if (!token) {
          console.info("No token found. Skipping fetch.");
          setUser(null); // Ensure user is null if no token
          return; // Exit early if no token
        }

        const response = await axios.get(
          "https://qatarbackend.solar-ict.com/api/auth/loggedin-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data); // set user data
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false); // finish loading
      }
    };

    if (refetch || user === null) {
      fetchUserData(); // fetch data when refetch is true or when user is not loaded yet
      setRefetch(false); // reset refetch state
    }
  }, [refetch, token, user]); // dependencies

  return { user, loading, error, refetch: () => setRefetch(true) }; // return the hook data
}
