import { useState, useEffect } from "react";

import styled from "styled-components";

import { districts } from "./districtList";

function Tiles(props) {
  const { formId, cn, from, phone, shadow } = props;

  const [cocom, setCocom] = useState(cn);
  const [comp, setComp] = useState(shadow);

  const [ph, setPh] = useState(null);
  const [fr, setFr] = useState(null);

  useEffect(() => {
    if (cocom.toString().length === 10) {
      setComp("anjani");
    } else if (cocom.toString().length === 9) {
      setComp("akash");
    } else {
      setComp("NULL");
    }
  }, [cocom]);

  return (
    <CashFormCard>
      <CashForm>
        <Tile
          style={{
            transition: "0.5s",
            // background:
            //   comp === "akash"
            //     ? "rgba(92, 92, 255, 0.25)"
            //     : comp === "anjani"
            //     ? "rgba(255, 78, 78, 0.25)"
            //     : "rgba(0, 0, 0, 0.25)",
            boxShadow:
              comp === "akash"
                ? "10px 8px 32px 0 rgba(17, 17, 236, 0.596)"
                : comp === "anjani"
                ? "10px 8px 32px 0 rgba(230, 23, 23, 0.842)"
                : "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <DivOne>
            <InputPair>
              <Label htmlFor="name" style={{ display: "flex" }}>
                <P>{formId + 1 + ". "}</P> CN
              </Label>
              <Input
                // style={{ width: "12ch" }}
                value={cocom !== null ? cocom : cn}
                type="number"
                name="name"
                onChange={(e) => setCocom(e.target.value)}
                autoComplete="off"
              />
            </InputPair>
          </DivOne>

          <DivTwo>
            <DivThree>
              {/* <span
                  style={{
                    boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.2)",
                    transition: ".5s ease",
                    transform: "rotate(270deg)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1rem",
                    background:
                      comp === "akash"
                        ? "#12328b"
                        : comp === "anjani"
                        ? "#a31111"
                        : "gray",
                    borderRadius: "10px",
                    color:
                      comp === "akash"
                        ? "#12328b"
                        : comp === "anjani"
                        ? "#a31111"
                        : "gray",
                  }}
                  onChange={(e) => setComp(e.target.value)}
                ></span> */}
            </DivThree>

            <DivFour>
              <DivFive>
                <InputPair>
                  <Label htmlFor="name">From</Label>
                  <Input
                    value={fr !== null ? fr : from}
                    onChange={(e) => setFr(e.target.value)}
                    type="text"
                    autoComplete="new-password"
                  />
                </InputPair>

                <InputPair>
                  <Label htmlFor="name">To</Label>
                  <Input type="text" autoComplete="new-password" />
                </InputPair>

                <InputPair>
                  <Label htmlFor="name">District</Label>
                  <Input
                    type="text"
                    autoComplete="new-password"
                    list="availableDistricts"
                  />
                  <datalist id="availableDistricts">
                    {districts.map((item, i) => (
                      <option key={i} value={`${item}`}>
                        {item}
                      </option>
                    ))}
                  </datalist>
                </InputPair>
              </DivFive>

              <DivSix>
                <InputPair>
                  <Label htmlFor="name">📞 +91</Label>
                  <Input
                    value={ph !== null ? ph : phone}
                    onChange={(e) => setPh(e.target.value)}
                    style={{ width: "12ch" }}
                    type="number"
                    autoComplete="off"
                  />
                </InputPair>

                <InputPair>
                  <Label htmlFor="name">⚖️</Label>
                  <Input
                    style={{ width: "7ch" }}
                    type="number"
                    step="50"
                    defaultValue={50}
                    autoComplete="new-password"
                  />
                </InputPair>

                <InputPair>
                  <Label htmlFor="name">₹</Label>
                  <Input
                    style={{ width: "5ch" }}
                    type="number"
                    step="10"
                    defaultValue={40}
                    autoComplete="new-password"
                  />
                </InputPair>
              </DivSix>
            </DivFour>
          </DivTwo>
        </Tile>
      </CashForm>
    </CashFormCard>
  );
}
export default Tiles;

const CashFormCard = styled.div`
  height: 90%;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 40%;
    width: 100%;
  }
`;

const CashForm = styled.form`
  height: inherit;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P = styled.p`
  /* color: #4dcc2d;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa; */
`;

const Tile = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: 30vh;
  width: 50;

  background: rgba(0, 0, 0, 0.25);
  /* box-shadow: 0 8px 32px 0 rgba(250, 250, 253, 0.37); */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 425px) {
    padding: 0;
    min-height: 40vh;
    align-items: center;
    justify-content: center;
    width: 80%;
  }
`;
const DivOne = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  margin-left: 5px;

  @media (max-width: 425px) {
    width: 70%;
    height: auto;
  }
`;
const DivTwo = styled.div`
  display: flex;
  height: 80%;

  @media (max-width: 425px) {
    flex-direction: column;
    height: auto;
  }
`;
const DivThree = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    display: none;
  }
`;
const DivFour = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 425px) {
  }
`;
const DivFive = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;

  & > * {
    margin-right: 2rem;
  }

  @media (max-width: 425px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
const DivSix = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50%;
  width: 100%;

  & > * {
    margin-right: 2rem;
  }

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

const InputPair = styled.div`
  display: flex;

  @media (max-width: 425px) {
    width: 70%;
    margin-bottom: 5px;
  }
`;
const Label = styled.label`
  color: white;
  padding-bottom: 5px;
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
  color: #3fc0e0;
  padding-bottom: 5px;
  padding-left: 5px;
  width: 5rem;

  @media (max-width: 425px) {
    width: 100%;
  }
`;
