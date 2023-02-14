// Imports
import { useState } from "react";
import styled from "styled-components";
import useAxiosPrivate from "../../hooks/usePrivateAxios";

// api URL for searching records
const SEARCH_URL = "find_many/";

// SearchRecord component
function SearchRecord(props) {
  // Destructuring props
  const { setRecords, setLoading } = props;

  // states for the component
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [comp, setComp] = useState("");

  // PrivateAxios instance to send api request
  const axiosPrivate = useAxiosPrivate();
  const handleSearch = async () => {
    setLoading(true);

    const data = {};
    if (from !== "")
      data["from_company"] = from.replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });
    if (to !== "")
      data["to_company"] = to.replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });
    if (district !== "")
      data["to_destination"] = district.replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });
    if (type !== "") data["courier_type"] = type;
    if (comp !== "") data["courier_company"] = comp;

    try {
      const response = await axiosPrivate.post(SEARCH_URL, data);
      setRecords(response?.data);
    } catch (err) {
      if (!err?.response) {
        console.log("NO SERVER RESPONSE");
      } else {
        console.log("SOMETHING WRONG");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchWrapper>
      <Search>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Input
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From Party"
            name="from_company"
          />
          <Input
            onChange={(e) => setTo(e.target.value)}
            placeholder="To Party"
            name="to_company"
          />
          <Input
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District"
            name="to_destination"
          />
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <Option value="">Either</Option>
            <Option value="cash">cash</Option>
            <Option value="credit">credit</Option>
          </Select>
          <Select value={comp} onChange={(e) => setComp(e.target.value)}>
            <Option value="">Either</Option>
            <Option value="akash">akash</Option>
            <Option value="anjani">anjani</Option>
          </Select>
          <Button type="submit">🔍</Button>
        </Form>
      </Search>
    </SearchWrapper>
  );
}
export default SearchRecord;

// Stylings
const SearchWrapper = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    height: 25vh;
  }
`;

const Search = styled.section`
  width: 100%;
`;

const Form = styled.form`
  margin: auto;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
  width: 8rem;
  padding: 10px 10px;
  color: white;
  outline: none;
  border: none;
`;

const Button = styled.button`
  outline: none;
  border: none;
  padding: 5px 0px;
  background: transparent;
  cursor: pointer;
  transition: 0.3s ease;
  width: 2rem;
  border-radius: 10px;

  &:hover {
    background: white;
  }

  @media (max-width: 768px) {
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
`;

const Select = styled.select`
  width: 4rem;
  outline: none;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;
const Option = styled.option`
  padding: 10px;
  background-color: black;
`;
