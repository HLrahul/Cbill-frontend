// Imports
import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Styled component MainWrapper
const MainWrapper = styled.div`
  min-height: 100%;
  max-width: 100%;
`;

// Actual Index for the react app which injects in the index.html root div...
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainWrapper>
        <App />
      </MainWrapper>
    </Provider>
  </React.StrictMode>
);
