import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import PartyPages from "./PartyPages";
import styled from "styled-components";
import Popup from "../Popup";
import Summary from "./Summary";
import { useRef } from "react";

const POST_URL = "";
const TOCTOD_URL = "tctd/";
const SEARCH_URL = "find_many/";

function PartyBook(props) {
  const {} = props; //Destructuring props

  const inputRef = useRef(null);
  const loadRef = useRef(false);
  const refreshRef = useRef(false);

  const [compLoading, setCompLoading] = useState(true);
  const [bookLoading, setBookLoading] = useState(true);
  const [toctod, setToctod] = useState();
  const [booked, setBooked] = useState();

  const [isValid, setIsValid] = useState(false);
  const [submitables, setSubmitables] = useState({});
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [summaryTrigger, setSummaryTrigger] = useState(false);
  const [notify, setNotify] = useState(false);
  const [status, setStatus] = useState(0);

  const [detail, setDetail] = useState(false);
  const [partyTiles, setPartyTiles] = useState([]);
  const [cnum, setCnum] = useState();
  const [nums, setNums] = useState(0);
  const [iteration, setIteration] = useState(0);

  const [active, setActive] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const partyName = location?.state?.partyName;

  const requestOne = async () => {
    try {
      const response = await axiosPrivate.get(`${TOCTOD_URL}${partyName}`);
      setToctod(response?.data);
    } catch (err) {
      if (!err?.response) {
        setToctod("No Response from Server!");
      } else {
        setToctod("Something Went Wrong!");
      }
    } finally {
      setCompLoading(false);
    }
  };

  const requestTwo = async () => {
    try {
      const data = { from_company: partyName };
      const response = await axiosPrivate.post(SEARCH_URL, data);

      if (response?.data.length === 0) {
        setBooked("Nothing Yet has been BOOKED!");
      } else {
        setBooked(response?.data);
      }
    } catch (err) {
      if (!err?.response) {
        setBooked("No Response from Server");
      } else {
        setBooked("Something Went Wrong");
      }
    } finally {
      setBookLoading(false);
    }
  };

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    if (loadRef.current) return;
    loadRef.current = true;

    requestOne();
    requestTwo();
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (refreshRef.current) return;
    refreshRef.current = true;

    setCompLoading(true);
    setBookLoading(true);

    requestOne();
    requestTwo();
  }, [status]);

  const handlePages = (e) => {
    e.preventDefault();
    setActive(true);

    const newTiles = [];
    for (let i = 0; i < nums; i++) {
      setIteration(i + 1);
      newTiles.push(
        <PartyPages
          key={i}
          formNum={i}
          courier_number={parseInt(cnum) + i}
          partyName={partyName}
          cweight={50}
          camount={40}
          submitables={submitables}
          setSubmitables={setSubmitables}
          setDeleteId={setDeleteId}
          setDeleteTrigger={setDeleteTrigger}
        />
      );
    }

    setPartyTiles(newTiles);
  };

  const handleReset = () => {
    setPartyTiles([]);
    setResetTrigger(false);
    setActive(false);
  };

  const deletePage = () => {
    setPartyTiles(partyTiles.filter((tile) => tile.key !== String(deleteId)));
    setSubmitables((prevSubmitables) => {
      const { [deleteId]: deleted, ...rest } = prevSubmitables;
      return rest;
    });
    setDeleteTrigger(false);
  };

  const postToApi = async (data) => {
    try {
      const response = await axiosPrivate.post(POST_URL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      setStatus(response?.status);
    } catch (err) {
      if (!err?.response) {
        console.log("NO SERVER RESPONSE");
        setStatus(err?.response?.status);
      } else {
        console.log(err);
        setStatus(err?.response?.status);
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
      if (partyTiles.length === 0) {
        handleReset();
      }
    }
  };

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

  const BACK = "< Back";
  return (
    <PartyWrapper>
      <MobileButtons>
        <Button
          className="mobile-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {BACK}
        </Button>
        <Button
          className="mobile-detail-btn"
          onClick={(e) => {
            e.preventDefault();
            setDetail(!detail);
          }}
        >
          Details
        </Button>
      </MobileButtons>

      <PartyPage>
        <PartyInfo className={detail ? "active" : ""}>
          <Button
            className="desktop-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            {BACK}
          </Button>

          <FrequentParties>
            <Head className="main-head">{partyName}</Head>

            {compLoading ? (
              <Loading>
                <Span className="clock">⚙️</Span>
                <Span className="antiClock">⚙️</Span>
              </Loading>
            ) : (
              <PartyList>
                <Head>Frequent Parties</Head>

                {typeof toctod === "object" ? (
                  Object.keys(toctod).length !== 0 ? (
                    <RecordTable>
                      <Tbody>
                        <Tr className="headRow">
                          <Th>To Party</Th>
                          <Th>Destination</Th>
                        </Tr>

                        {Object.keys(toctod).map((key, index) => {
                          return (
                            <Tr key={index}>
                              <Td data-label="To">{key}</Td>
                              <Td data-label="District">
                                {toctod[String(key)]}
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </RecordTable>
                  ) : (
                    <P>No Party Details yet have been saved!</P>
                  )
                ) : (
                  <P>{toctod}</P>
                )}
              </PartyList>
            )}
          </FrequentParties>

          <PreviousBooks>
            <Head>Booked Couriers</Head>

            {bookLoading ? (
              <Loading>
                <Span className="clock">⚙️</Span>
                <Span className="antiClock">⚙️</Span>
              </Loading>
            ) : Array.isArray(booked) ? (
              <RecordTable>
                <Tbody>
                  <Tr className="headRow">
                    <Th>Date</Th>
                    <Th>C.Number</Th>
                    <Th>To</Th>
                    <Th>District</Th>
                    <Th>Weight</Th>
                  </Tr>
                  {booked.map((record, index) => {
                    const formattedDate = format(
                      new Date(record.booked_date),
                      "dd-MM-yy"
                    );

                    return (
                      <Tr key={index}>
                        <Td data-label="Date">{formattedDate}</Td>
                        <Td data-label="C.Number">{record.courier_number}</Td>
                        <Td data-label="To">{record.to_company}</Td>
                        <Td data-label="District">{record.to_destination}</Td>
                        <Td data-label="Weight">{`${record.courier_weight} g`}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </RecordTable>
            ) : (
              <P>{booked}</P>
            )}
          </PreviousBooks>
        </PartyInfo>

        <BookParty>
          <Form
            onSubmit={handlePages}
            method="none"
            className={active ? "active" : ""}
          >
            <Input
              ref={inputRef}
              className="courier_number"
              type="number"
              onChange={(e) => setCnum(e.target.value)}
              required
            />
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
                paddingRight: "5px",
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

            <Button className="go-btn" type="submit">
              GO
            </Button>
          </Form>
          <Reset className={active ? "active" : ""}>
            <Button
              className="reset-btn"
              onClick={(e) => setResetTrigger(true)}
            >
              Reset
            </Button>
          </Reset>

          <Pages>{partyTiles}</Pages>

          <ButtonGroup>
            <AddPage
              title="Add a Tile"
              className={active ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setPartyTiles([
                  ...partyTiles,
                  <PartyPages
                    key={iteration}
                    formNum={iteration}
                    courier_number={parseInt(cnum) + iteration}
                    partyName={partyName}
                    cweight={50}
                    camount={40}
                    submitables={submitables}
                    setSubmitables={setSubmitables}
                    setDeleteId={setDeleteId}
                    setDeleteTrigger={setDeleteTrigger}
                  />,
                ]);
                setIteration((prevIteration) => prevIteration + 1);
              }}
            >
              +
            </AddPage>
            <BookButton
              className={active ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setSummaryTrigger(true);
              }}
            >
              BOOK
            </BookButton>
          </ButtonGroup>

          <Popup
            trigger={deleteTrigger}
            setTrigger={setDeleteTrigger}
            actionName="Confirm Delete?"
            actionFunc={deletePage}
          />
        </BookParty>
      </PartyPage>

      <Popup
        trigger={resetTrigger}
        setTrigger={setResetTrigger}
        actionName="Confirm Reset?"
        actionFunc={handleReset}
      />

      <Popup
        trigger={notify}
        setTrigger={setNotify}
        actionName="Add BookList!"
      />

      <Summary
        trigger={summaryTrigger}
        setTrigger={setSummaryTrigger}
        submitables={submitables}
        isValid={isValid}
        action={handleSubmit}
      />
    </PartyWrapper>
  );
}
export default PartyBook;

const PartyWrapper = styled.div`
  min-height: 90vh;
  width: 100%;
  background: #2f3136;
  padding: 1rem;
`;

const MobileButtons = styled.div`
  height: 5vh;
  width: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const PartyPage = styled.div`
  height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;

const PartyInfo = styled.section`
  height: 85vh;
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    z-index: 1;
    justify-content: space-around;
    width: 95%;
    position: fixed;
    top: 16.5vh;
    left: -100%;
    transition: 0.5s ease;
    background: #2f3136;

    &.active {
      left: 0.65rem;
    }
  }
`;
const Button = styled.button`
  height: 2rem;
  width: 5rem;
  padding: 5px;
  border: none;
  outline: none;
  text-transform: uppercase;
  color: #ffffff86;
  letter-spacing: 1px;
  background: #202225;
  margin-bottom: 0.25rem;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: white;
  }

  @media (max-width: 768px) {
    &.desktop-btn {
      display: none;
    }

    &.mobile-btn {
      margin-bottom: 1rem;
    }

    &.mobile-detail-btn {
      margin-bottom: 1rem;
    }
  }

  &.go-btn {
    background: #ffffff86;
    color: #202225;
    width: 2.5rem;
    height: 2rem;
    margin-left: 1rem;

    &:hover {
      color: white;
    }
  }

  &.reset-btn {
    background: #ffffff86;
    color: #202225;
    width: 5rem;
    height: 2rem;
    margin-left: 1rem;

    &:hover {
      color: white;
    }

    @media (max-width: 768px) {
      margin-left: 0;
    }
  }
`;
const FrequentParties = styled.div`
  height: 38vh;
  width: 100%;
  background: #202225;
  gap: 10px;
`;
const Head = styled.p`
  height: 2rem;
  width: inherit;
  color: whitesmoke;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: #2f3136;
  display: flex;
  align-items: center;

  &.main-head {
    justify-content: center;
  }
`;

const Loading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2f3136;
`;

const Span = styled.span`
  position: absolute;
  font-size: 2rem;

  &.clock {
    margin-top: -3.75rem;
    margin-left: -3rem;
    font-size: 3rem;
    animation: clock 2s infinite linear;
  }
  &.antiClock {
    animation: antiClock 2s infinite linear;
  }

  @keyframes clock {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  @keyframes antiClock {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-359deg);
    }
  }
`;

const PartyList = styled.div`
  height: 90%;
  width: 100%;
  color: #c7c7c7e2;
  background: #202225;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: black;
  }
  &::-webkit-scrollbar-thumb {
    background: #2f3136;
  }
`;

const P = styled.p`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviousBooks = styled.div`
  height: 38vh;
  width: 100%;
  background: #202225;
  color: #cac9c9df;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: black;
  }
  &::-webkit-scrollbar-thumb {
    background: #2f3136;
  }
`;

const RecordTable = styled.table`
  font-size: 0.85rem;
  height: auto;
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
  }
`;
const Tbody = styled.tbody`
  & Tr:nth-child(even) {
    background-color: #00000088;
  }

  & Th {
    top: 0;
    position: sticky;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
const Tr = styled.tr`
  @media (max-width: 768px) {
    width: 90%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 12.5px;
    margin-bottom: 12.5px;
    border: 1px solid gray;

    &.headRow {
      display: none;
    }
  }
`;
const Th = styled.th`
  background: blue;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;
const Td = styled.td`
  padding: 10px;
  text-align: center;
  transition: 0.3s ease;

  @media (max-width: 768px) {
    color: white;
    display: block;
    text-align: right;
    position: relative;
    padding-left: 50%;

    &::before {
      content: attr(data-label);
      color: grey;
      position: absolute;
      left: 0;
      width: 50%;
      font-weight: 900;
      text-align: left;
      padding-left: 10px;
    }
  }
`;

const BookParty = styled.section`
  height: 85vh;
  width: 49%;
  background: #202225;
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 80vh;
  }
`;

const Pages = styled.div`
  height: 66vh;
  width: 100%;
  overflow-y: auto;
  padding: 0 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: black;
  }
  &::-webkit-scrollbar-thumb {
    background: #2f3136;
  }

  @media (max-width: 768px) {
    max-height: 80%;
  }
`;

const Form = styled.form`
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    display: none;
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
    -webkit-text-fill-color: #2f3136 !important;
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
  color: #d8d9da;
  padding-bottom: 5px;
  padding-left: 5px;
  width: 5rem;

  &.courier_number {
    width: 5rem;
    height: 2rem;
    padding: 5px 0px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      margin-bottom: 10px;
    }
  }
`;

const Dec = styled.button`
  height: 22px;
  width: 30px;
  background: transparent;
  outline: none;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  @media (max-width: 768px) {
    margin-bottom: 3px;
    height: 25px;
    width: 32px;
  }
`;
const Inc = styled(Dec)`
  margin-left: 0;
`;

const Reset = styled.div`
  height: 10%;
  width: 100%;
  display: none;
  align-items: center;
  justify-content: center;

  &.active {
    display: flex;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddPage = styled.button`
  &.active {
    display: block;
  }

  display: none;
  margin-top: 1rem;
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
`;

const BookButton = styled.button`
  &.active {
    display: block;
  }

  display: none;
  outline: none;
  border: none;
  height: 2rem;
  width: 5rem;
  border-radius: 25px;
  transition: 0.4s ease;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 1rem;

  &:hover {
    background: black;
    color: white;
  }
`;
