import styled from "styled-components";

import Login from "../components/Login";
import InfoSection from "../components/InfoSection";
import homepageBG from "../assets/mailDoodle.jpg";

function Homepage() {
  return (
    <>
      <Section>
        <SubSection>
          <InfoSection />

          <Login />
        </SubSection>
      </Section>
    </>
  );
}

export default Homepage;

const Section = styled.section`
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* opacity: 1; */
    background-image: url(${homepageBG});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;
const SubSection = styled.section`
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    flex-direction: column;
    width: 90%;
  }
`;
