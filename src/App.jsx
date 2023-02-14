// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/secure/Dashboard";
import Cash from "./pages/secure/Cash";
import Credit from "./pages/secure/Credit";
import PartyBook from "./components/dashboard components/PartyBook";
import Records from "./pages/secure/Records";
import RequireAuth from "./hooks/RequireAuth";
import RefreshToken from "./hooks/RefreshToken";
import PersistLogin from "./components/PersistLogin";
import Tabs from "./components/Tabs";
import Loading from "./components/Loading";

// Functional App component
function App() {
  // constant for AccessToken
  const aT = useSelector(state => state.user.userAccessToken);

  // checking if user already logged in for persist login
  const [isloading, setIsLoading] = useState(true);
  const loadRef = useRef(false);
  const refresh = RefreshToken();
  useEffect(() => {
    if (loadRef.current) return;
    loadRef.current = true;

    const verifyRefresh = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !aT ? verifyRefresh() : setIsLoading(false);
  }, []);

  // Actual app JSX
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <AppWrapper>
          <Router>
            <Tabs />

            <Routes>
              <Route path="/" element={<Homepage />} />

              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cash" element={<Cash />} />
                  <Route path="/credit" element={<Credit />} />
                  <Route path="/partyBook" element={<PartyBook />} />
                  <Route path="/records" element={<Records />} />
                  <Route path="/loading" element={<Loading />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AppWrapper>
      )}
    </>
  );
}
export default App;

// Stylings for the APP component
const P = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: #2f3136;
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: 100%;
  margin: auto;

  @media (max-width: 400px) {
    min-width: 100%;
  }
`;
