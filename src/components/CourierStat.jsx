import { useState } from "react";
import { axiosPublic } from "../api/axios";
import styled from "styled-components";

const STAT_URL = "drs/";

const AnjaniTable = (details) => {
  return (
    <Table>
      <Tbody>
        <Tr>
          <Th>MFAX/PKG</Th>
          <Th>Date</Th>
          <Th>Type</Th>
          <Th>Branch</Th>
          <Th>Time</Th>
        </Tr>

        {details.details.map((detail, index) => {
          return (
            <Tr key={index}>
              <Td data-label="MFAX/PKG">{detail["MFAX/PKG."]}</Td>
              <Td data-label="Date">{detail["Date"]}</Td>
              <Td data-label="Type">{detail["Type"]}</Td>
              <Td data-label="Branch">{detail["Branch"]}</Td>
              <Td data-label="Time">{detail["Time"]}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

const AkashTable = (details) => {
  return (
    <Table>
      <Tbody>
        <Tr>
          <Th>Upload By</Th>
          <Th>Date</Th>
          <Th>Type</Th>
          <Th>Time</Th>
          <Th>Origin --{">"} Dest</Th>
          <Th>Weight</Th>
          <Th>Out Station</Th>
          <Th>Description</Th>
        </Tr>

        {details.details.map((detail, index) => {
          return (
            <Tr key={index}>
              <Td data-label="Upload By">{detail["Upload By"]}</Td>
              <Td data-label="Date">{detail.Date}</Td>
              <Td data-label="Type">{detail.Type}</Td>
              <Td data-label="Time">{detail.Time}</Td>
              <Td data-label="Origin --> Dest">
                {detail["Origin --> Dest.City"]}
              </Td>
              <Td data-label="Weight">{detail.Weight}</Td>
              <Td data-label="Out Station">{detail["Out Station"]}</Td>
              <Td data-label="Description">{detail.Description}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

const Table = styled.table`
  font-size: 0.8rem;
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
    display: block;
    margin-bottom: 25px;
    border: 1px solid gray;
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

function CourierStat() {
  const [loading, setLoading] = useState(false);
  const [cnum, setCnum] = useState();
  const [stat, setStat] = useState();
  const [len, setLen] = useState();

  const handleSubmit = async () => {
    setLoading(true);
    setLen(String(cnum).length);

    try {
      const response = await axiosPublic.get(`${STAT_URL}${cnum}/`);
      setStat(response?.data);
    } catch (err) {
      if (!err?.response) {
        setStat("No Response From Server! Try again!");
      } else {
        setStat("Something Went Wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CourierStatWrapper>
      <StatContainer>
        <StatForm>
          <Form>
            <Input
              type="number"
              onChange={(e) => setCnum(e.target.value)}
              required
            />
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              🔍
            </Button>
          </Form>
        </StatForm>

        <Stat>
          {loading ? (
            <LoadingWrapper>
              <LoadGears>
                <Span className="clock">⚙️</Span>
                <Span className="antiClock">⚙️</Span>
              </LoadGears>
            </LoadingWrapper>
          ) : Array.isArray(stat?.detail) ? (
            len === 9 ? (
              <AkashTable details={stat.detail} />
            ) : (
              <AnjaniTable details={stat.detail} />
            )
          ) : (
            <P>{JSON.stringify(stat)}</P>
          )}
        </Stat>
      </StatContainer>
    </CourierStatWrapper>
  );
}
export default CourierStat;

// Stylings
const CourierStatWrapper = styled.div`
  height: 90vh;
  width: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatContainer = styled.section`
  height: 70%;
  width: 80%;
  border: 1px solid #36393f;
  background: #36393f;
  padding: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 90%;
    height: 60%;
  }
`;

const StatForm = styled.div`
  height: 20%;
  width: 90%;
  background: #2f3136;
  padding: 15px;

  @media (max-width: 768px) {
    height: 10%;
  }
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  height: 100%;
  width: 90%;
  padding: 15px;
  color: white;

  outline: none;
  border: none;
  background: #202225;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px black inset !important;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #202225 !important;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Button = styled.button`
  height: 100%;
  width: 10%;
  cursor: pointer;
  background: #202225;
  border: none;
  outline: none;

  @media (max-width: 768px) {
    height: 1.9rem;
  }
`;

const Stat = styled.section`
  height: 75%;
  width: 90%;
  background: #2f3136;
  color: white;
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

const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2f3136;
`;

const LoadGears = styled.div`
  height: 20%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const P = styled.p`
  height: 100%;
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
