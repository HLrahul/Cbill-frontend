// Imports
import { useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import useAxiosPrivate from "../../hooks/usePrivateAxios";

// update api url
const UPDATE_URL = "update/";

// Function to render an Editable row in the records table
function EditableRow(props) {
  // destructuring props
  const { record, index, setEditId, getRecords } = props;

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
  } = record; // Destructuring the record Object

  // Formatting Date
  const formattedDate = format(new Date(booked_date), "dd-MM-yy");
  // Formatting Time
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const [hours, minutes, seconds] = booked_time.split(":");
  const time = new Date(0, 0, 0, hours, minutes, seconds);
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  const formattedTime = timeFormatter.format(time);

  // States to update the record with user provided values
  const [cnum, setCnum] = useState(courier_number);
  const [ctype, setCtype] = useState(courier_type);
  const [ccom, setCcom] = useState(courier_company);
  const [from, setFrom] = useState(from_company);
  const [to, setTo] = useState(to_company);
  const [dest, setDest] = useState(to_destination);
  const [cweight, setCweight] = useState(courier_weight);
  const [crate, setCrate] = useState(courier_rate);
  const [phone, setPhone] = useState(phone_no);

  // private axios instance from useAxiosPrivate
  const axiosPrivate = useAxiosPrivate();
  const handleSave = async (e) => {
    e.preventDefault();

    const toUpdate = {
      courier_number: cnum,
      courier_type: ctype,
      courier_company: ccom,
      from_company: from,
      to_company: to,
      to_destination: dest,
      courier_weight: cweight,
      courier_rate: crate,
      phone_no: phone,
      booked_date: booked_date,
      booked_time: booked_time,
    };
    // actual axios request
    try {
      await axiosPrivate.put(UPDATE_URL, { ...toUpdate });
      getRecords();
    } catch (err) {
      if (!err?.response) {
        console.log("NO RESPONSE FROM SERVER");
      } else {
        console.log("SOMETHING WRONG");
      }
    }

    setEditId();
  };

  // JSX element for the editable row
  return (
    <Tr key={index}>
      <Td data-label="C.Number">
        <Input
          type="number"
          name="C.Number"
          value={cnum}
          onChange={(e) => setCnum(e.target.value)}
        />
      </Td>
      <Td data-label="C.Type">
        <Select value={courier_type} onChange={(e) => setCtype(e.target.value)}>
          <Option value="cash">cash</Option>
          <Option value="credit">credit</Option>
        </Select>
      </Td>
      <Td data-label="C.Company">
        <Select
          value={courier_company}
          onChange={(e) => setCcom(e.target.value)}
        >
          <Option value="akash">akash</Option>
          <Option value="anjani">anjani</Option>
        </Select>
      </Td>
      <Td data-label="From">
        <Input
          name="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </Td>
      <Td data-label="To">
        <Input name="To" value={to} onChange={(e) => setTo(e.target.value)} />
      </Td>
      <Td data-label="Destination">
        <Input
          name="Destination"
          value={dest}
          onChange={(e) => setDest(e.target.value)}
        />
      </Td>
      <Td data-label="Weight">
        <Input
          type="number"
          name="Weight"
          value={cweight}
          onChange={(e) => setCweight(e.target.value)}
        />
      </Td>
      <Td data-label="Amount">
        <Input
          type="number"
          name="Amount"
          value={crate}
          onChange={(e) => setCrate(e.target.value)}
        />
      </Td>
      <Td data-label="Phone">
        <Input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Td>
      <Td data-label="Date">{formattedDate}</Td>
      <Td data-label="Time">{formattedTime}</Td>
      <Td data-label="Cancel">
        <Button
          onClick={(e) => {
            e.preventDefault();
            setEditId();
          }}
        >
          Cancel
        </Button>
      </Td>
      <Td data-label="Save">
        <Button onClick={handleSave} className="save-btn">
          Save
        </Button>
      </Td>
    </Tr>
  );
}
export default EditableRow;

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

const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  padding-bottom: 5px;
  width: 10ch;
  transition: 0.3s ease;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 20ch;
  }
`;

const Select = styled.select`
  width: 4rem;
  outline: none;
  border: none;
  background-color: transparent;
  color: white;
`;
const Option = styled.option`
  padding: 10px;
  background-color: black;
`;

const Button = styled.button`
  height: 2rem;
  width: 4rem;
  border: none;
  /* border-radius: 10px; */
  color: white;
  background: #bb2121b9;
  transition: 0.3s ease;

  &:hover {
    background: red;
  }

  &.save-btn {
    width: 3rem;
    background: #128312;

    &:hover {
      background: #00ff00;
    }
  }
`;
