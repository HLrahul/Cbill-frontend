import styled from "styled-components";

import Tiles from "./Tiles";

function Cash() {
  const times = [];
  for (let i = 0; i < 5; i++) {
    times.push(<Tiles key={i} />);
  }

  return (
    <>
      <CashWrapper>{times}</CashWrapper>
      <ButtonWrapper>
        <Button>BOOK</Button>
      </ButtonWrapper>
    </>
  );
}
export default Cash;

const CashWrapper = styled.section`
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  & > * {
    margin-top: 3rem;
    margin-bottom: 4rem;
  }

  @media (max-width: 400px) {
    & > * {
      margin-top: 0.5rem;
      margin-bottom: 2rem;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  height: 2rem;
  width: 5rem;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: 0.5s ease;
  border-radius: 10px;

  &:hover {
    background: white;
    color: black;
    box-shadow: 5px 4px 12px 0 rgba(44, 190, 190, 0.61);
  }
`;
