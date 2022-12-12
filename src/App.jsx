import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import styled from "styled-components";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Router>
      </AppWrapper>
    </Provider>
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
