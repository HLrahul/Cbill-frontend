import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
import styled from "styled-components";
import Popup from "./Popup";

const LOGOUT_URL = "/logout";

function Tabs() {
  const [trigger, setTrigger] = useState(false);
  const [active, setActive] = useState(false);

  const accessToken = useSelector((state) => state.user.userAccessToken);

  const navigate = useNavigate();
  const HandleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGOUT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setTrigger(false);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        console.log("No response from Server");
      } else {
        console.log("Something went wrong");
      }
    }
  };

  function toggleActive() {
    setActive((prevActive) => !prevActive);
  }
  function activeToggle() {
    setActive((prevActive) => prevActive);
  }

  return (
    <TabsWrapper>
      <TabLinks>
        <Header>
          <P>COURIER BILLING</P>
        </Header>
        <Ullist className={active ? "active" : ""} onClick={toggleActive}>
          <StyledTabLinks onClick={activeToggle}>CASH</StyledTabLinks>
          <StyledTabLinks onClick={activeToggle}>CREDIT</StyledTabLinks>
          <StyledTabLinks onClick={activeToggle}>RECORDS</StyledTabLinks>
          <StyledTabLinks onClick={(e) => setTrigger(true)}>
            LOGOUT
          </StyledTabLinks>
        </Ullist>
        <Div className={active ? "active" : ""} onClick={toggleActive}>
          <Span className="bar"></Span>
          <Span className="bar"></Span>
          <Span className="bar"></Span>
        </Div>
      </TabLinks>

      <Popup
        trigger={trigger}
        setTrigger={setTrigger}
        actionName="Logout"
        actionFunc={HandleLogout}
      />
    </TabsWrapper>
  );
}

export default Tabs;

const TabsWrapper = styled.section`
  top: 0;
  position: sticky;
  z-index: 10;
`;

const TabLinks = styled.div`
  height: 10vh;
  width: 100%;
  padding: 24px 0px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  height: inherit;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const P = styled.p`
  font-weight: bolder;
  text-transform: uppercase;
  font-size: 1rem;
  color: white;
`;

const Ullist = styled.ul`
  height: 10vh;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 75px;

  @media (max-width: 768px) {
    position: fixed;
    top: 10vh;
    right: -100%;
    height: 35vh;
    gap: 10px;
    flex-direction: column;
    background-color: #000000;
    width: 100%;
    text-align: center;
    transition: 0.5s;

    &.active {
      right: 0;
    }
  }
`;

const StyledTabLinks = styled.li`
  list-style-type: none;
  color: white;
  font-weight: bolder;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.5s ease;

  &:hover {
    color: #11b2b8;
  }
`;

const Div = styled.div`
  width: 20%;
  margin-left: auto;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;

    &.active .bar:nth-child(2) {
      opacity: 0;
    }
    &.active .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    &.active .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
`;

const Span = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;

  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: white;

  @media (max-width: 768px) {
  }
`;
