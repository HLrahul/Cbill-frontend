// Imports
import styled from "styled-components";
import Login from "../components/Login";
import InfoSection from "../components/InfoSection";
import CourierStat from "../components/CourierStat";

// Homepage functional component
function Homepage() {
  return (
    <>
      <Section>
        <CourierStat />

        <SubSection>
          <InfoSection />
          <Login />
        </SubSection>

        <Scroll>
          <Navs>
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
              }}
            >
              ˄
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, document.body.scrollHeight);
              }}
            >
              ˅
            </Button>
          </Navs>
        </Scroll>
      </Section>
    </>
  );
}
export default Homepage;

// Stylings
const Section = styled.section`
  min-height: -webkit-fill-available;
  width: 100%;
  background: #2f3136;
`;
const SubSection = styled.section`
  height: 90vh;
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Scroll = styled.div`
  bottom: 0;
  right: 0;
  position: fixed;
  background: transparent;
  height: 5rem;
  width: 8rem;
`;
const Navs = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  padding: 10px;
  gap: 15px;
`;
const Button = styled.button`
  height: 2rem;
  width: 2rem;
  background: #202225;
  color: white;
  cursor: pointer;
  border: none;
  vertical-align: center;
`;
