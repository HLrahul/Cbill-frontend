// Imports
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RefreshToken from "../hooks/RefreshToken";
import styled from "styled-components";

// Actual PersistLogin component
const PersistLogin = () => {
  // constants for the Hooks
  const [isLoading, setIsLoading] = useState(true);
  const refresh = RefreshToken();
  const aT = useSelector((state) => state.user.userAccessToken);

  // Persist Login using custom refresh hook
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !aT ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  // react fragment
  return <>{isLoading ? <P>Loading...</P> : <Outlet />}</>;
};
export default PersistLogin;

// Styling for the P tag
const P = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: black;
`;
