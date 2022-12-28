// Imports
import { useState, useEffect, useRef } from "react";
import { districts } from "./districtList";
import styled from "styled-components";

// Tiles Functional Component
function Tiles(props) {
  // Destructuring Props
  const {
    formId,
    cn,
    from,
    phone,
    shadow,
    setDeleteTrigger,
    setDeleteId,
    setSubmitables,
  } = props;

  // States for the Form fields
  const [comp, setComp] = useState(shadow);

  const [cnum, setcnum] = useState(cn);
  const [fr, setFr] = useState(from);
  const [to, setTo] = useState(" ");
  const [district, setDistrict] = useState("Select");
  const [ph, setPh] = useState(phone);
  const [weight, setWeight] = useState(50);
  const [amount, setAmount] = useState(40);

  // UseEffect hook for changing the background color of the Tile depending on the Company
  useEffect(() => {
    if (cnum.toString().length === 10) {
      setComp("anjani");
    } else if (cnum.toString().length === 9) {
      setComp("akash");
    } else {
      setComp("NULL");
    }
  }, [cnum]);

  //  This segment is to select the whole word when clicked on the District input field
  const inputRef = useRef(null);
  useEffect(() => {
    const input = inputRef.current;
    input.addEventListener("click", selectInput);

    return () => {
      input.removeEventListener("click", selectInput);
    };
  }, []);
  function selectInput(event) {
    event.target.select();
  }

  //UseState  hook to check whether the TileValues present in the Submitables
  const [inSubmitables, setInSubmitables] = useState(false);
  useEffect(() => {
    setInSubmitables(false);
  }, [cnum, fr, to, district, ph, weight, amount]);

  // To save the Tile state to the Final Submitables state for posting it to api
  const handleSave = (e) => {
    e.preventDefault();

    setInSubmitables(true);

    const TileValues = {
      [formId]: {
        courier_number: parseInt(cnum),
        courier_type: "cash",
        courier_company: comp,
        from_company: fr,
        to_company: to,
        to_destination: district,
        courier_weight: weight,
        courier_rate: amount,
        phone_no: parseInt(ph),
      },
    };

    setSubmitables((prevSubmitables) => {
      return { ...prevSubmitables, ...TileValues };
    });
  };

  // Actual Tile Component JSX
  return (
    <CashFormCard>
      <CashForm>
        <Tile
          style={{
            transition: "0.5s",
            boxShadow:
              comp === "akash"
                ? "10px 8px 32px 0 rgba(17, 17, 236, 0.596)"
                : comp === "anjani"
                ? "10px 8px 32px 0 rgba(230, 23, 23, 0.842)"
                : "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <Delete
            onClick={(e) => {
              setDeleteTrigger(true);
              setDeleteId(formId);
            }}
          >
            <Span className="bar"></Span>
            <Span className="bar"></Span>
          </Delete>
          <DivOne>
            <InputPair>
              <Label htmlFor="name" style={{ display: "flex" }}>
                <P>{formId + 1 + ". "}</P> CN
              </Label>
              <Input
                value={cnum !== null ? cnum : cn}
                type="number"
                name="name"
                onChange={(e) => setcnum(e.target.value)}
                autoComplete="off"
              />
            </InputPair>
          </DivOne>

          <DivTwo>
            <DivThree></DivThree>

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
                  <Input
                    onChange={(e) => setTo(e.target.value)}
                    value={to}
                    type="text"
                    autoComplete="new-password"
                  />
                </InputPair>

                <InputPair>
                  <Label htmlFor="name">District</Label>
                  <Input
                    onChange={(e) => setDistrict(e.target.value)}
                    ref={inputRef}
                    value={district}
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
                  <Label htmlFor="name">+91</Label>
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
                    onChange={(e) => setWeight(e.target.value)}
                    style={{ width: "7ch" }}
                    type="number"
                    step="50"
                    defaultValue={weight}
                    autoComplete="new-password"
                  />
                </InputPair>

                <InputPair>
                  <Label htmlFor="name">₹</Label>
                  <Input
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: "5ch" }}
                    type="number"
                    step="10"
                    defaultValue={amount}
                    autoComplete="new-password"
                  />
                </InputPair>

                <Wrap>
                  <Button onClick={handleSave} className="savebtn">
                    Save
                  </Button>
                  <Check className={inSubmitables ? "saved" : ""}>✓</Check>
                </Wrap>
              </DivSix>
            </DivFour>
          </DivTwo>
          <ButtonDiv></ButtonDiv>
        </Tile>
      </CashForm>
    </CashFormCard>
  );
}
export default Tiles;

// Styling for the JSX Elements
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
  letter-spacing: 2px;
  color: #cee213;
`;

const Tile = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: 30vh;
  width: 50;

  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 425px) {
    padding: 0;
    min-height: 50vh;
    align-items: center;
    justify-content: center;
    width: 80%;
  }
`;

const Delete = styled.div`
  position: absolute;
  left: 90%;

  cursor: pointer;
  & .bar:nth-child(1) {
    transform: translateY(5px) rotate(45deg);
  }
  & .bar:nth-child(2) {
    transform: translateY(-8px) rotate(-45deg);
  }

  &:hover {
    .bar {
      background-color: #db1212;
    }
  }

  @media (max-width: 425px) {
    left: 87%;
    bottom: 85%;
  }
`;
const Span = styled.span`
  display: block;
  width: 20px;
  height: 3px;
  margin: 10px auto;
  background-color: white;
  transition: 0.3s;
`;

const DivOne = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  margin-left: 5px;

  @media (max-width: 425px) {
    width: 70%;
    height: auto;
    margin-left: 5px;
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
    height: auto;
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
    height: auto;
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
    margin-right: 1.5rem;
  }

  @media (max-width: 425px) {
    height: auto;
    flex-direction: column;
  }
`;

const ButtonDiv = styled.div``;

const Button = styled.button`
  margin-right: 1rem;
  height: 2rem;
  width: 4rem;
  background: white;
  color: black;
  cursor: pointer;
  transition: 0.5s ease;
  border-radius: 10px;

  &.savebtn:hover {
    background: rgba(12, 216, 63, 0.61);
  }
  &.deletebtn:hover {
    background: rgba(214, 20, 20, 0.61);
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

const Wrap = styled.div`
  display: flex;
`;

const Check = styled.span`
  font-size: 1.5rem;
  display: none;
  color: #0dd10d;

  &.saved {
    display: block;
  }

  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
`;
