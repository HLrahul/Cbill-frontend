// Imports
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { parties } from "../../components/dashboard components/CompaniesList";

// Particular Cards
const CreditCard = (partyName) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/partyBook", { state: { partyName: partyName.partyName } });
  }

  return (
    <Card onClick={handleClick}>
      <Descript>{partyName.partyName}</Descript>
    </Card>
  );
};

// Credit Functional component
function Credit() {
  const inputRef = useRef(null);

  const [partiesList] = useState(Object.keys(parties).sort());
  const [filterlist, setFilterList] = useState(Object.keys(parties).sort());
  const [key, setKey] = useState("");
  const [toggle, setToggle] = useState(false);
  const [addtoggle, setAddtoggle] = useState(false);
  const [newParty, setNewParty] = useState("");

  // useEffect hook to run whenever the key changes
  useEffect(() => {
    inputRef.current.focus();
    const filters = partiesList.filter((party) =>
      party.toLowerCase().includes(key.toLowerCase())
    );
    setFilterList(filters);
  }, [key]);

  const handleAddParty = () => {
    parties[newParty] = [];
    setToggle(!toggle);
  };

  // Actual JSX element for the Functional component
  return (
    <CreditWrapper>
      <Search>
        <Input
          ref={inputRef}
          title="Search 🔍 Party"
          type="text"
          onChange={(e) => setKey(e.target.value)}
        />

        <Button
          title="Add a Party"
          onClick={(e) => {
            e.preventDefault();
            setToggle(!toggle);
            setAddtoggle(!addtoggle);
          }}
          className={toggle ? "plus-btn active" : "plus-btn"}
        >
          +
        </Button>
      </Search>

      <AddWrapper className={toggle ? "active" : ""}>
        <AddParty>
          <Input
            className="addParty"
            type="text"
            onChange={(e) => setNewParty(e.target.value)}
          />
          <Button
            title="click to add party"
            className={addtoggle ? "addParty-btn active" : "addParty-btn"}
            onClick={(e) => {
              e.preventDefault();
              handleAddParty;
            }}
          >
            ADD
          </Button>
        </AddParty>
      </AddWrapper>

      <CreditTiles>
        {filterlist.map((party, index) => (
          <CreditCard partyName={party} key={index} />
        ))}
      </CreditTiles>
    </CreditWrapper>
  );
}
export default Credit;

// Stylings for the particular cards
const Card = styled.div`
  height: 14rem;
  width: 15rem;
  border-radius: 10px;
  border: 1px solid #202225;
  background: #202225;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: 0.9s ease;

  &:hover {
    border: 1px solid white;

    & > * {
      color: white;
    }
  }

  @media (max-width: 768px) {
    height: 9.5rem;
    width: 9.5rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    padding: 10px;
  }
`;

const Descript = styled.p`
  color: #ffffff86;
  position: absolute;
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 30px;
  width: 12rem;
  cursor: pointer;
  margin-top: 5rem;
  transition: 0.5s ease;

  @media (max-width: 768px) {
    margin-top: 3rem;
    font-size: 20px;
    width: 8rem;
  }
`;

// Stylings for the credit page
const CreditWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #2f3136;
`;

const Search = styled.div`
  height: 15vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddWrapper = styled.div`
  height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  transition: all 0.4s ease-in-out;

  &.active {
    height: 25vh;
  }
`;
const AddParty = styled.div`
  height: 90%;
  width: 80%;
  background: #202225;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  background: #202225;
  outline: none;
  border: none;
  font-size: 1.25rem;
  color: white;

  &.addParty {
    background: #2f3136;
  }
  @media (max-width: 768px) {
    width: 10rem;
  }
`;

const Button = styled.button`
  padding: 7.5px;
  font-size: 1.5rem;
  border: none;
  outline: none;
  width: 3rem;
  cursor: pointer;
  transition: 0.5s;

  &.plus-btn {
    position: absolute;
    margin-left: 75%;
    transition: 0.3s;

    &.active {
      transform: rotate(45deg);
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 768px) {
      margin-left: 70%;
      position: absolute;
    }
  }
  &.addParty-btn {
    display: none;
    padding: 12.5px;
    width: 5rem;
    font-size: 1rem;
    font-weight: bolder;
    transition: all 0.3s ease-in-out;

    &.active {
      display: block;
    }
  }
  &:hover {
    background: white;
  }

  @media (max-width: 768px) {
    padding: 7px;
  }
`;

const CreditTiles = styled.section`
  height: inherit;
  width: 80%;
  margin: auto;
  padding-bottom: 4rem;

  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  transition: 0.5s ease;

  @media (max-width: 768px) {
    gap: 0;
    justify-content: space-between;
    width: 85%;
    padding-bottom: 1rem;
  }
`;
