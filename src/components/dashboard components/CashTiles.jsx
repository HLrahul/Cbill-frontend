import { useState, useEffect, useRef } from "react";
import { districts } from "./districtList";
import styled from "styled-components";

function CashTiles(props) {
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

  const [cnum, setcnum] = useState(cn);
  const [fr, setFr] = useState(from);
  const [to, setTo] = useState("");
  const [district, setDistrict] = useState("");
  const [ph, setPh] = useState(phone);
  const [weight, setWeight] = useState(50);
  const [amount, setAmount] = useState(40);

  const [comp, setComp] = useState(shadow);
  useEffect(() => {
    if (cnum.toString().length === 10) {
      setComp("anjani");
    } else if (cnum.toString().length === 9) {
      setComp("akash");
    } else {
      setComp("NULL");
    }
  }, [cnum]);

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

  useEffect(() => {
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
        phone_no: phone,
      },
    };

    setSubmitables((prevSubmitables) => {
      return { ...prevSubmitables, ...TileValues };
    });
  }, [cnum, fr, to, district, ph, weight, amount]);

  return (
    <CashFormCard
      style={{
        background:
          String(cnum).length === 9
            ? "#1c345c"
            : String(cnum).length === 10
            ? "#641c21"
            : "#2f3136",
      }}
    >
      <CashForm>
        <Delete
          title="Delete"
          onClick={(e) => {
            setDeleteTrigger(true);
            setDeleteId(formId);
          }}
        >
          <Span className="bar"></Span>
          <Span className="bar"></Span>
        </Delete>

        <Div className="cNum">
          <P>C.Num *</P>
          <Input
            value={cnum !== null ? cnum : cn}
            type="number"
            minLength="9"
            maxlength="10"
            name="name"
            onChange={(e) => setcnum(e.target.value)}
            autoComplete="off"
          />
        </Div>

        <Div className="from">
          <P>From *</P>
          <Input
            value={fr !== null ? fr : from}
            onChange={(e) => setFr(e.target.value)}
            type="text"
            autoComplete="new-password"
          />
        </Div>

        <Div className="to">
          <P>To *</P>
          <Input
            onChange={(e) => setTo(e.target.value)}
            value={to}
            type="text"
            autoComplete="new-password"
          />
        </Div>

        <Div className="district">
          <P>Dist *</P>
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
        </Div>

        <Div className="phone small one">
          <P>+91</P>
          <Input
            value={ph !== null ? ph : phone}
            onChange={(e) => setPh(e.target.value)}
            type="number"
            minlength="10"
            maxlength="10"
            autoComplete="off"
          />
        </Div>

        <Div className="weight small two">
          <P>⚖️</P>
          <Input
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            step="50"
            defaultValue={weight}
            autoComplete="new-password"
          />
        </Div>

        <Div className="amount small three">
          <P>Fa₹e</P>
          <Input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            step="10"
            defaultValue={amount}
            autoComplete="new-password"
          />
        </Div>
      </CashForm>
    </CashFormCard>
  );
}

export default CashTiles;

// Stylings
const CashFormCard = styled.div`
  background: #2f3136;
  height: 90%;
  width: 42.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease;

  @media (max-width: 768px) {
    height: 40%;
    width: 90%;
  }
`;

const CashForm = styled.form`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-areas:
    "cNum other delete"
    "from to district"
    "phone weight amount";
  padding: 25px 25px;
  grid-row-gap: 25px;
  grid-column-gap: 10px;

  @media (max-width: 768px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    &.small {
      justify-content: space-between;
    }
    &.one .two .three {
      gap: 0;
    }
  }

  &.cNum {
    grid-area: cNum;
    align-self: center;
    justify-self: center;
  }

  &.from {
    grid-area: from;
    align-self: center;
    justify-self: center;
  }

  &.to {
    grid-area: to;
    justify-self: center;
    align-self: center;
  }

  &.district {
    grid-area: district;
    justify-self: center;
    align-self: center;
  }

  &.phone {
    grid-area: phone;
    justify-self: center;
    align-self: center;
  }

  &.weight {
    grid-area: weight;
    justify-self: center;
    align-self: center;
  }

  &.amount {
    grid-area: amount;
    justify-self: center;
    align-self: center;
  }
`;

const P = styled.p`
  color: #75787cc3;
`;

const Input = styled.input`
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px #202225 inset !important;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: white !important;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  background: #202225;
  height: 2rem;
  width: 7rem;
  padding: 10px 10px;
  color: white;
  outline: none;
  border: none;

  &.white {
    color: white;
  }
`;

const Delete = styled.div`
  grid-area: delete;
  justify-self: end;
  align-self: center;

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

  @media (max-width: 768px) {
    margin-top: -1rem;
    margin-left: 19rem;
  }
`;
const Span = styled.span`
  &.active {
    display: none;
  }

  display: block;
  width: 20px;
  height: 3px;
  margin: 10px auto;
  background-color: white;
  transition: 0.3s;
`;
