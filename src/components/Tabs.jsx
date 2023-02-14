// Imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../store/store";
import axios from "../api/axios";
import styled from "styled-components";
import Popup from "./Popup";

// Logout api URL
const LOGOUT_URL = "/logout/";

// Tabs component
function Tabs() {
  // getting the logged in status
  const aT = useSelector((state) => state?.user?.userAccessToken);

  // Triggers and active boolean constants for popups
  const [trigger, setTrigger] = useState(false);
  const [active, setActive] = useState(false);
  const [tabActive, setTabActive] = useState("dashboard");

  // constants for the hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // logout function to block the refresh token and
  // erase the present user credentials from userSlice
  const HandleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(LOGOUT_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTrigger(false);
      dispatch(logout());
    } catch (err) {
      if (!err?.response) {
        console.log("No response from Server");
      } else {
        console.log("Something went wrong");
      }
    } finally {
      navigate("/");
    }
  };

  // functions to toggle the popup
  function toggleActive() {
    setActive((prevActive) => !prevActive);
  }
  function activeToggle() {
    setActive((prevActive) => prevActive);
  }

  // jsx element for the tabs component
  return (
    <TabsWrapper>
      <TabLinks>
        <Header>
          <P>
            <Link
              className={tabActive === "dashboard" ? active : ""}
              onClick={() => {
                setTabActive("dashboard");
              }}
              to="/dashboard"
            >
              COURIER BILLING
            </Link>
          </P>
        </Header>
        <Ullist className={active ? "active" : ""} onClick={toggleActive}>
          <StyledTabLinks
            className={tabActive === "cash" ? "active" : ""}
            onClick={() => {
              activeToggle;
              setTabActive("cash");
            }}
          >
            <Link to="/cash">CASH</Link>
          </StyledTabLinks>
          <StyledTabLinks
            className={tabActive === "credit" ? "active" : ""}
            onClick={() => {
              activeToggle;
              setTabActive("credit");
            }}
          >
            <Link to="/credit">CREDIT</Link>
          </StyledTabLinks>
          <StyledTabLinks
            className={tabActive === "records" ? "active" : ""}
            onClick={() => {
              activeToggle;
              setTabActive("records");
            }}
          >
            <Link to="/records">RECORDS</Link>
          </StyledTabLinks>
          {aT ? (
            <StyledTabLinks
              className="logout-btn"
              onClick={(e) => setTrigger(true)}
            >
              LOGOUT
            </StyledTabLinks>
          ) : null}
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
        actionName="Logout ?"
        actionFunc={HandleLogout}
      />
    </TabsWrapper>
  );
}

export default Tabs;

// Styling for the above component
const TabsWrapper = styled.section`
  top: 0;
  position: sticky;
  z-index: 10;
`;

const TabLinks = styled.div`
  height: 10vh;
  width: 100%;
  padding: 24px 0px;
  background: #202225;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Link = styled(NavLink)`
  padding: 5px 10px;
  text-decoration: none;
  color: #7a7b81;
  transition: 0.3s ease;

  &:hover {
    color: white;
  }
  &.active {
    background: white;
    color: #180f0a;
  }
`;

const Header = styled.div`
  height: inherit;
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  letter-spacing: 1px;
  margin-left: 1rem;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const P = styled.p`
  font-weight: bolder;
  text-transform: uppercase;
  font-size: 1rem;
  color: white;
`;

const Ullist = styled.ul`
  height: 10vh;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 75px;

  @media (max-width: 768px) {
    position: fixed;
    top: 10vh;
    right: -100%;
    height: 30vh;
    gap: 25px;
    flex-direction: column;
    background-color: #202225;
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
  transition: 0.3s ease;

  &.logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 5.5rem;
    background: #bb2121b9;
  }
  &.logout-btn:hover {
    background: red;
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
`;
