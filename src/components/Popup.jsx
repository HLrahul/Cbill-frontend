// Imports
import styled from "styled-components";

// Actual Popup component
function Popup(props) {
  // destructuring the props
  const { actionName, actionFunc } = props;

  // JSX element
  return props.trigger ? (
    <PopupWrapper>
      <Pop>
        <h3>{actionName}</h3>
        <br />
        <Section>
          {actionFunc ? (
            <Button onClick={actionFunc}>{actionName.split(" ")[0]}</Button>
          ) : (
            ""
          )}
          <Button onClick={() => props.setTrigger(false)}>Cancel</Button>
        </Section>
      </Pop>
    </PopupWrapper>
  ) : (
    ""
  );
}
export default Popup;

// Stylings
const PopupWrapper = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Pop = styled.div`
  position: relative;

  height: 20vh;
  width: 25%;
  color: white;

  @media (max-width: 768px) {
    width: 80%;
  }

  background: #202225;
  border: 1px solid #2f3136;
  /* backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18); */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section`
  display: flex;
  width: 50%;
  height: auto;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 60%;
  }
`;

const Button = styled.button`
  height: 2rem;
  width: 5rem;
  outline: none;
  border: none;
  background: #2f3136;
  color: white;
  cursor: pointer;
  transition: 0.5s ease;
  /* border-radius: 10px; */

  &:hover {
    background: white;
    color: black;
  }
`;
