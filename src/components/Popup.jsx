import { useSelector } from "react-redux";

import axios from "../api/axios";
import styled from "styled-components";

const LOGOUT_URL = "/logout";

function Popup(props) {
  const accessToken = useSelector((state) => state.user.userAccessToken);

  const HandleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(LOGOUT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
    } catch {}
  };

  return props.trigger ? (
    <PopupWrapper>
      <Pop>
        <h3>Confirm Logout?</h3>
        <br />
        <Section>
          <Button onClick={HandleLogout}>Logout</Button>
          <Button onClick={() => props.setTrigger(false)}>Cancel</Button>
        </Section>
      </Pop>
    </PopupWrapper>
  ) : (
    ""
  );
}
export default Popup;

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Pop = styled.div`
  position: relative;

  height: 20vh;
  width: 25%;
  color: white;

  @media (max-width: 400px) {
    width: 80%;
  }

  background: rgba(0, 0, 0, 0.25);
  box-shadow: 10px 8px 32px 0 rgba(250, 250, 253, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section`
  display: flex;
  width: 50%;
  height: auto;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 400px) {
    width: 60%;
  }
`;

const Button = styled.button`
  height: 2rem;
  width: 5rem;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: 0.5s ease;
  border-radius: 10px;

  &:hover {
    background: white;
    color: black;
    box-shadow: 5px 4px 12px 0 rgba(44, 190, 190, 0.61);
  }
`;
