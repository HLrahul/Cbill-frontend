import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/store";

import axios from "../api/axios";
import styled from "styled-components";
import billingPNG from "../assets/billingIcon.png";

const LOGOUT_URL = "logout/";

function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.value.username);
  const accessToken = useSelector((state) => state.user.value.userAccessToken);

  const LogoutHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGOUT_URL,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));
      dispatch(logout);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavbarWrapper>
      <NavBar>
        <ImgDiv>
          <NavLink to="/">
            <StyledImg src={billingPNG} alt="logo" />
          </NavLink>
        </ImgDiv>
        <div>
          {userName !== "" && accessToken !== "" ? (
            <Ullist>
              <StyledNavLink href="#logout" onClick={LogoutHandler}>
                Logout
              </StyledNavLink>
            </Ullist>
          ) : (
            <Ullist>
              <StyledNavLink href="#login"> Login </StyledNavLink>
              <StyledNavLink href="#register"> Register </StyledNavLink>
              <StyledNavLink href="#info"> Info </StyledNavLink>
            </Ullist>
          )}
        </div>
      </NavBar>
    </NavbarWrapper>
  );
}

export default Navbar;

const NavbarWrapper = styled.div`
  top: 0;
  position: sticky;
  z-index: 2;
`;

const NavBar = styled.div`
  background: black;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0px 10px; */

  @media (max-width: 400px) {
    padding: 0px 20px;
  }
`;

const StyledImg = styled.img`
  height: 1.5rem;
  width: 1.5rem;

  transition: 0.5s ease;
  &:hover {
    transform: scale(1.25);
  }
`;

const Ullist = styled.ul`
  height: 100%;
  width: 15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
`;

const ImgDiv = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

const StyledNavLink = styled.a`
  margin-left: auto;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 900;
  color: white;

  transition: 0.5s ease;
  &:hover {
    color: #11b2b8;
    transform: scale(1.05);
  }
`;
