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

// const InfoSection = styled.section`
//   height: 90vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   margin: auto;

//   @media (max-width: 400px) {
//     height: 30vh;
//   }

//   & > p {
//     color: #f70b4e;
//     line-break: after;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     font-weight: 100;
//     font-size: 8rem;

//     @media (max-width: 800px) {
//       font-size: 3rem;
//     }
//     @media (max-width: 400px) {
//       padding: 0px 20px;
//       font-size: 3rem;
//     }
//   }
// `;
