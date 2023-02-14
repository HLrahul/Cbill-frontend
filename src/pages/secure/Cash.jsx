// Imports
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CashTiles from "../../components/dashboard components/CashTiles";
import Popup from "../../components/Popup";
import Summary from "../../components/dashboard components/Summary";
import useAxiosPrivate from "../../hooks/usePrivateAxios";

const POST_URL = "";

// Cash functional component
function Cash() {
  const inputRef = useRef(null);

  // Custom hook
  const axiosPrivate = useAxiosPrivate();

  // triggers for Summary
  const [summaryTrigger, setSummaryTrigger] = useState(false);

  // Triggers for Popups
  const [trigger, setTrigger] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [notify, setNotify] = useState(false);

  // State for the Final Submitables
  const [submitables, setSubmitables] = useState({});
  const [isValid, setIsValid] = useState(false);

  // State for the cash input field values
  const [from, setFrom] = useState("");
  const [cn, setCn] = useState(NaN);
  const [phone, setPhone] = useState(undefined);
  const [nums, setNums] = useState(0);

  // State for the Tiles
  const [tiles, setTiles] = useState([]);
  const [iteration, setIteration] = useState(0);

  // State for the Generate and Reset actions
  const [active, setActive] = useState(false);

  // Debugging and miscellaneous goes here
  useEffect(() => {
    inputRef.current.focus();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let bool = true;
    for (let key in submitables) {
      if (
        submitables[key].to_company === "" ||
        submitables[key].to_destination === ""
      ) {
        bool = false;
        break;
      }
    }

    bool ? setIsValid(true) : setIsValid(false);
  }, [submitables]);

  const postToApi = async (data) => {
    try {
      await axiosPrivate.post(POST_URL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      if (!err?.response) {
        console.log("NO SERVER RESPONSE");
      } else {
        console.log(err);
      }
    }
  };
  const handleSubmit = () => {
    if (Object.keys(submitables).length !== 0) {
      Object.keys(submitables).map((key) => {
        const data = submitables[key];
        return postToApi(data);
      });
      setSummaryTrigger(false);
      handleReset();
    } else {
      setNotify(true);
      if (tiles.length === 0) {
        handleReset();
      }
    }
  };

  // Function to handle the Generate button for generating Tiles
  const handleGenerate = (e) => {
    e.preventDefault();

    setActive(true);
    const newTiles = [];
    for (let i = 0; i < Math.abs(nums); i++) {
      newTiles.push(
        <CashTiles
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
          setDeleteTrigger={setDeleteTrigger}
          setDeleteId={setDeleteId}
          setSubmitables={setSubmitables}
        />
      );
      setIteration(parseInt(cn) + i);
    }
    setTiles(newTiles);
  };

  // Function to handle the Reset button
  function handleReset() {
    setNums(0);
    setTiles([]);
    setActive(false);
    setSubmitables({});
    setTrigger(false);
  }

  // Function to delete a Tile from the cash component after generated
  const deleteTile = () => {
    setTiles(tiles.filter((tile) => tile.key !== String(deleteId)));
    setSubmitables((prevSubmitables) => {
      const { [deleteId]: deleted, ...rest } = prevSubmitables;
      return rest;
    });
    setDeleteTrigger(false);
  };

  // Actual Cash Component JSX
  return (
    <CashComponent>
      <Section className={active ? "active" : ""}>
        <Form onSubmit={handleGenerate} method="none">
          <Div>
            <InputPair>
              <Label>From</Label>
              <Input
                ref={inputRef}
                type="text"
                style={{ width: "16ch" }}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </InputPair>
            <InputPair>
              <Label>C.Number</Label>
              <Input
                type="number"
                minlength="9"
                maxlength="10"
                style={{ width: "13ch" }}
                onChange={(e) => setCn(e.target.value)}
                required
              />
            </InputPair>
            <InputPair>
              <Label>Ph.Number</Label>
              <Input
                type="number"
                style={{ width: "13ch" }}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputPair>
            <InputPair>
              <Label className="NumsCourierlbl">CouriersCount</Label>
              <Dec
                onClick={(e) => {
                  e.preventDefault();
                  setNums((prevNums) => prevNums - 1);
                }}
              >
                -
              </Dec>
              <Input
                required
                className="NumsCourier"
                type="number"
                value={nums}
                style={{
                  width: "5ch",
                  textAlign: "center",
                }}
                onChange={(e) => setNums(e.target.value)}
              />
              <Inc
                onClick={(e) => {
                  e.preventDefault();
                  setNums((prevNums) => prevNums + 1);
                }}
              >
                +
              </Inc>
            </InputPair>
            <Button type="submit">GENERATE</Button>
          </Div>
        </Form>
      </Section>
      <Reset className={active ? "active" : ""}>
        <Button onClick={(e) => setTrigger(true)}>Reset</Button>
      </Reset>
      <CashWrapper>{tiles}</CashWrapper>
      <ButtonWrapper>
        <AddPage
          title="Add a Tile"
          className={active ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setTiles([
              ...tiles,
              <CashTiles
                key={iteration + 1}
                formId={iteration + 1}
                cn={iteration + 1}
                from={from}
                phone={phone}
                shadow={
                  cn.toString().length === 10
                    ? "anjani"
                    : cn.toString().length === 9
                    ? "akash"
                    : ""
                }
                setDeleteTrigger={setDeleteTrigger}
                setDeleteId={setDeleteId}
                submitables={submitables}
                setSubmitables={setSubmitables}
              />,
            ]);
            setIteration((prevIteration) => prevIteration + 1);
          }}
        >
          +
        </AddPage>
        <Button
          onClick={(e) => {
            setSummaryTrigger(true);
          }}
        >
          BOOK
        </Button>
      </ButtonWrapper>

      <Summary
        trigger={summaryTrigger}
        setTrigger={setSummaryTrigger}
        submitables={submitables}
        isValid={isValid}
        action={handleSubmit}
      />

      <Popup
        trigger={trigger}
        setTrigger={setTrigger}
        actionName="Reset"
        actionFunc={handleReset}
      />
      <Popup
        trigger={deleteTrigger}
        setTrigger={setDeleteTrigger}
        actionName="Delete"
        actionFunc={deleteTile}
      />
      <Popup
        trigger={notify}
        setTrigger={setNotify}
        actionName="Add BookList!"
      />
    </CashComponent>
  );
}
export default Cash;

//  Styling of the Cash Component
const CashComponent = styled.div`
  padding-top: 2.5rem;
  background: #2f3136;

  @media (max-width: 768px) {
    padding-top: 2rem;
  }
`;

const CashWrapper = styled.section`
  width: 100%;
  min-height: 75vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  background: #202225;

  & > * {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    min-height: 50vh;

    & > * {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  }
`;

const Form = styled.form`
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: space-around;
`;

const Section = styled.section`
  height: 10vh;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 2rem;

  &.active {
    display: none;
  }

  @media (max-width: 768px) {
    height: 30vh;
    width: auto;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-bottom: 2rem;

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
  margin-bottom: 2rem;

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
  outline: none;
  border: none;
  font-size: 0.7rem;
  height: 2rem;
  width: 5rem;
  background: #ffffffc8;
  color: black;
  cursor: pointer;
  transition: 0.5s ease;

  &:hover {
    background: white;
  }
`;

const Div = styled.div`
  height: inherit;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 60%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const InputPair = styled.div`
  display: flex;

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;
const Label = styled.label`
  color: #ffffffa0;
  background: #202225;
  padding-top: 3px;
  padding-left: 5px;
  padding-right: 5px;

  @media (max-width: 768px) {
    &.NumsCourierlbl {
      margin-bottom: 5px;
    }
  }
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
  padding: 10px 10px;
  color: white;
  outline: none;
  border: none;

  &.white {
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  &.NumsCourier {
    border-left: 0;

    @media (max-width: 768px) {
      margin-bottom: 5px;
    }
  }
`;

const Dec = styled.button`
  width: 30px;
  background: transparent;
  outline: none;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-top: auto;
    margin-bottom: 5px;
    height: 32px;
    width: 32px;
  }
`;
const Inc = styled(Dec)`
  margin-left: 0;
`;

const AddPage = styled.button`
  &.active {
    display: block;
  }

  display: none;
  position: absolute;
  /* margin-top: 1rem; */
  margin-left: -10rem;
  outline: none;
  border: none;
  background: #747474;
  width: 2rem;
  height: 2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.5s ease;

  &:hover {
    background: white;
  }

  @media (max-width: 768px) {
    margin-left: -9rem;
  }
`;
