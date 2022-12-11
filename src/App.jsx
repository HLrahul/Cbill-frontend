import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <AppWrapper>
      <Router>
        <Navbar />
      </Router>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  background: black;
  min-height: 100vh;
  width: 70%;
  margin: auto;

  @media (max-width: 400px) {
    width: 100%;
  }
`;
