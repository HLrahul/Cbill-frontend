import { useEffect, useState } from "react";

import styled from "styled-components";

import Tiles from "./Tiles";
import Popup from "../Popup";

function Cash() {
  const [trigger, setTrigger] = useState(false);

  const [submitables, setSubmitables] = useState([]);

  const [nums, setNums] = useState(0);
  const [tiles, setTiles] = useState([]);

  const [from, setFrom] = useState(" ");
  const [cn, setCn] = useState(0);
  const [phone, setPhone] = useState(0);

  useEffect(() => {
    const newArray = new Array(Math.abs(nums));
    setSubmitables(newArray);
  }, [nums]);

  const [active, setActive] = useState(false);

  const handleGenerate = () => {
    setActive(true);
    const newTiles = [];
    for (let i = 0; i < nums; i++) {
      newTiles.push(
        <Tiles
          key={i}
          formId={i}
          cn={parseInt(cn) + i}
          from={from}
          phone={phone}
          shadow={
            cn.toString().length === 10
              ? "anjani"
              : cn.toString().length === 9
              ? "akash"
              : ""
          }
        />
      );
    }
    setTiles(newTiles);
  };

  function handleReset() {
    setNums(0);
    setTiles([]);
    setActive(false);
    setTrigger(false);
  }

  return (
    <>
      <Section className={active ? "active" : ""}>
        <Div>
          <InputPair>
            <Label>From</Label>
            <Input
              type="text"
              style={{ width: "16ch" }}
              onChange={(e) => setFrom(e.target.value)}
            />
          </InputPair>
          <InputPair>
            <Label>Courier Number</Label>
            <Input
              type="number"
              style={{ width: "12ch" }}
              onChange={(e) => setCn(e.target.value)}
            />
          </InputPair>
          <InputPair>
            <Label>Phone Number</Label>
            <Input
              type="number"
              style={{ width: "12ch" }}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputPair>
          <InputPair>
            <Label className="NumsCourierlbl">CouriersCount</Label>
            <Dec onClick={() => setNums((prevNums) => prevNums - 1)}>-</Dec>
            <Input
              className="NumsCourier"
              type="number"
              value={nums}
              style={{ width: "5ch", textAlign: "center", paddingRight: "5px" }}
              onChange={(e) => setNums(e.target.value)}
            />
            <Inc onClick={() => setNums((prevNums) => prevNums + 1)}>+</Inc>
          </InputPair>
          <Button onClick={handleGenerate}>GENERATE</Button>
        </Div>
      </Section>
      <Reset className={active ? "active" : ""}>
        <Button onClick={(e) => setTrigger(true)}>Reset</Button>
      </Reset>

      <CashWrapper>{tiles}</CashWrapper>
      <ButtonWrapper>
        <Button>BOOK</Button>
      </ButtonWrapper>

      <Popup
        trigger={trigger}
        setTrigger={setTrigger}
        actionName="Reset"
        actionFunc={handleReset}
      />
    </>
  );
}
export default Cash;

const CashWrapper = styled.section`
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  & > * {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 425px) {
    min-height: 50vh;

    & > * {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  }
`;

const Section = styled.section`
  height: 10vh;
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: center;

  &.active {
    display: none;
  }

  @media (max-width: 425px) {
    height: 35vh;
    width: auto;
    flex-direction: column;
    align-items: center;
    margin: auto;

    & > * {
      margin-right: 0;
    }
  }
`;

const Reset = styled.div`
  width: 100%;
  height: auto;
  display: none;
  align-items: center;
  justify-content: center;

  &.active {
    display: flex;
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

  @media (max-width: 425px) {
    background: white;
    color: black;

    &:hover {
      background: white;
      color: black;
    }
  }
`;

const Div = styled.div`
  height: inherit;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 425px) {
    width: 60%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const InputPair = styled.div`
  display: flex;

  @media (max-width: 425px) {
    margin-bottom: 5px;
  }
`;
const Label = styled.label`
  color: white;
  padding-bottom: 5px;
  padding-right: 5px;
  border-bottom: 1px solid white;

  &.NumsCourierlbl {
    border-right: 1px solid white;
  }
`;
const Input = styled.input`
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px black inset !important;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #3fc0e0 !important;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  color: #3fc0e0;
  padding-bottom: 5px;
  padding-left: 5px;
  width: 5rem;

  @media (max-width: 425px) {
    width: 100%;
  }

  &.NumsCourier {
    border-left: 0;
  }
`;

const Dec = styled.button`
  width: 30px;
  background: transparent;
  outline: none;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  @media (max-width: 425px) {
    margin-top: auto;
    margin-bottom: 5px;
    height: 32px;
    width: 32px;
  }
`;
const Inc = styled(Dec)`
  margin-left: 0;
`;
