import styled from "styled-components";

function InfoSection() {
  return (
    <Div>
      <Wrapper>
        <Text>CB</Text>
      </Wrapper>
    </Div>
  );
}
export default InfoSection;

const Div = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    height: 20vh;
    margin-top: 15vh;
  }
`;

const Wrapper = styled.section`
  height: 50%;
  width: 80%;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: #f70b4e;
  font-size: 5rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 900;

  @media (max-width: 425px) {
    font-size: 3rem;
  }
`;
