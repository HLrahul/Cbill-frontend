import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import App from "./App";
import "./index.css";

const MainWrapper = styled.div`
  min-height: 100%;
  max-width: 100%;
  background: black;
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainWrapper>
      <App />
    </MainWrapper>
  </React.StrictMode>
);
