// Imports
import { format } from "date-fns";
import styled from "styled-components";
import usePrivateAxios from "../../hooks/usePrivateAxios";

// Function to render the Table records in the table
function ReadOnlyRow(props) {
  const { record, index, setEditId, setDeleteRecId, setDeleteRecTrigger } =
    props;

  // Options for Time formatting
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  // Actual table data
  const {
    courier_number,
    courier_type,
    courier_company,
    from_company,
    to_company,
    to_destination,
    courier_weight,
    courier_rate,
    phone_no,
    booked_date,
    booked_time,
  } = record;

  // Formatting Date
  const formattedDate = format(new Date(booked_date), "dd-MM-yy");
  // Formatting Time
  const [hours, minutes, seconds] = booked_time.split(":");
  const time = new Date(0, 0, 0, hours, minutes, seconds);
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  const formattedTime = timeFormatter.format(time);

  // axiosPrivate instance from usePrivateAxios
  const axiosPrivate = usePrivateAxios();

  // jsx element for the row in the table
  return (
    <Tr key={index}>
      <Td data-label="C.Number">{courier_number}</Td>
      <Td data-label="C.Type">{courier_type}</Td>
      <Td data-label="C.Company">{courier_company}</Td>
      <Td data-label="From">{from_company}</Td>
      <Td data-label="To">{to_company}</Td>
      <Td data-label="Destination">{to_destination}</Td>
      <Td data-label="Weight">{courier_weight}</Td>
      <Td data-label="Amount">{courier_rate}</Td>
      <Td data-label="Phone">{phone_no}</Td>
      <Td data-label="Date">{formattedDate}</Td>
      <Td data-label="Time">{formattedTime}</Td>
      <Td data-label="Edit">
        <Button
          onClick={(e) => {
            e.preventDefault();
            setEditId(courier_number);
          }}
        >
          EDIT
        </Button>
      </Td>
      <Td data-label="Delete">
        <Button
          className="delete-btn"
          onClick={() => {
            setDeleteRecId(courier_number);
            setDeleteRecTrigger(true);
          }}
        >
          DELETE
        </Button>
      </Td>
    </Tr>
  );
}
export default ReadOnlyRow;

// Stylings
const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 25px;
    border: 1px solid gray;
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

const Button = styled.button`
  height: 2rem;
  width: 3rem;
  border: none;
  /* border-radius: 10px; */
  color: white;
  background: #1d1d7a;
  transition: 0.3s ease;

  &:hover {
    background: #0000ff;
  }

  &.delete-btn {
    width: 4rem;
    background: #bb2121b9;

    &:hover {
      background: red;
    }
  }
`;
