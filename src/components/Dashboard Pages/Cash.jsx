import { useEffect, useState } from "react";

import styled from "styled-components";

import Tiles from "./Tiles";

function Cash() {
  const [nums, setNums] = useState(0);
  const [tiles, setTiles] = useState([]);

  const [from, setFrom] = useState("");
  const [cn, setCn] = useState(0);
  const [phone, setPhone] = useState(0);

  useEffect(() => {
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
  }, [nums, cn, phone, from]);

  return (
    <>
      <Section>
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
          <Label>Number of Couriers</Label>
          <Input
            type="number"
            style={{ width: "5ch" }}
            onChange={(e) => setNums(e.target.value)}
          />
        </InputPair>
      </Section>

      <CashWrapper>{tiles}</CashWrapper>
      <ButtonWrapper>
        <Button>BOOK</Button>
      </ButtonWrapper>
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
    margin-bottom: 4rem;
  }

  @media (max-width: 400px) {
    min-height: 50vh;

    & > * {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
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

const Section = styled.section`
  height: 10vh;
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: center;

  @media (max-width: 400px) {
    height: 25vh;
    width: auto;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5rem;

    & > * {
      margin-right: 0;
    }
  }

  & > * {
    margin-right: 2rem;
  }
`;

const InputPair = styled.div`
  display: flex;

  @media (max-width: 400px) {
    margin-bottom: 5px;
  }
`;
const Label = styled.label`
  color: white;
  padding-bottom: 5px;
  padding-right: 5px;
  border-bottom: 1px solid white;
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

  @media (max-width: 400px) {
    width: 100%;
  }
`;
