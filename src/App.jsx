import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import styled from "styled-components";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Router>
          {/* <Navbar /> */}

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </AppWrapper>
    </Provider>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  margin: auto;

  @media (max-width: 400px) {
    width: 100%;
  }
`;
