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
  height: 30vh;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 20vh;
    width: 100%;
  }
`;

const Wrapper = styled.section`
  height: 50%;
  width: 80%;
  background: #36393f;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #36393f;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: white;
  font-size: 5rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;
