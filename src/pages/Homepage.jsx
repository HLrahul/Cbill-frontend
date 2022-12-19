import styled from "styled-components";

import Login from "../components/Login";

function Homepage() {
  return (
    <>
      <Login />

      <InfoSection id="info">
        <p>Courier Billing</p>
      </InfoSection>
    </>
  );
}

export default Homepage;

const InfoSection = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  color: white;

  & > p {
    background-clip: text;
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to right, #21c9f3, #5345d4, #6523cf, #0c82a0);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

    line-break: after;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 100;
    font-size: 8rem;

    @media (max-width: 800px) {
      font-size: 4rem;
    }
    @media (max-width: 400px) {
      padding: 0px 20px;
      font-size: 3rem;
    }
  }
`;
