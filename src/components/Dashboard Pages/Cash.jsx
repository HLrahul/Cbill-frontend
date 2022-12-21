import { useState, useEffect } from "react";

import styled from "styled-components";
import { districts } from "./districtList";

function Cash() {
  const [cocom, setCocom] = useState(0);
  const [comp, setComp] = useState("akash");

  useEffect(() => {
    if (cocom.length === 10) {
      setComp("anjani");
    } else {
      setComp("akash");
    }
  }, [cocom]);

  return (
    <CashWrapper>
      <CashFormCard>
        <CashForm>
          <Tile>
            <InputPair>
              <Label htmlFor="name">Courier Number</Label>
              <Input
                type="number"
                name="name"
                onChange={(e) => setCocom(e.target.value)}
                autoComplete="off"
              />
            </InputPair>

            <InputPair>
              <Label htmlFor="name">Courier Company</Label>
              <Input
                type="text"
                name="name"
                value={comp}
                onChange={(e) => setComp(e.target.value)}
              />
            </InputPair>
          </Tile>

          <Tile>
            <InputPair>
              <Label htmlFor="name">From</Label>
              <Input type="text" name="name" autoComplete="new-password" />
            </InputPair>

            <InputPair>
              <Label htmlFor="name">To</Label>
              <Input type="text" name="name" autoComplete="new-password" />
            </InputPair>

            <InputPair>
              <Label htmlFor="name">To District</Label>
              <Input
                type="text"
                name="name"
                autoComplete="new-password"
                list="availableDistricts"
              />
              <datalist id="availableDistricts">
                {districts.map((item, i) => (
                  <option value={`${item}`}>{item}</option>
                ))}
              </datalist>
            </InputPair>
          </Tile>

          <Tile>
            <InputPair>
              <Label htmlFor="name">Weight</Label>
              <Input
                type="number"
                name="name"
                defaultValue={50}
                autoComplete="new-password"
              />
            </InputPair>

            <InputPair>
              <Label htmlFor="name">Rate</Label>
              <Input type="number" name="name" autoComplete="new-password" />
            </InputPair>

            <InputPair>
              <Label htmlFor="name">Phone Number</Label>
              <Input type="number" name="name" autoComplete="new-password" />
            </InputPair>
          </Tile>
        </CashForm>
      </CashFormCard>
    </CashWrapper>
  );
}
export default Cash;

const CashWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CashFormCard = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 95%;
  }
`;

const CashForm = styled.form`
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
`;

const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputPair = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  color: white;
  padding-bottom: 10px;
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

  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  color: #3fc0e0;
  padding-bottom: 5px;
`;
