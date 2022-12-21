import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";
import billingPNG from "../assets/billingIcon.png";

function Navbar() {
  const userName = useSelector((state) => state.user.value.username);
  const accessToken = useSelector((state) => state.user.value.userAccessToken);

  let [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    if (userName === null || accessToken === null) {
      setNavLinks([]);
    } else {
      setNavLinks([]);
    }
  }, [userName, accessToken]);

  return (
    <NavbarWrapper>
      <NavBar>
        <ImgDiv>
          <NavLink to="/">
            <StyledImg src={billingPNG} alt="logo" />
          </NavLink>
        </ImgDiv>
        <div>
          <Ullist>
            {navLinks.map((navs, i) => (
              <StyledNavLink key={i} href={`#${navs}`}>
                {navs}
              </StyledNavLink>
            ))}
          </Ullist>
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
  background: transparent;
  width: 100%;
`;

const NavBar = styled.div`
  height: 10vh;
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 400px) {
    padding: 0px 20px;
    width: 80%;
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
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
  }
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
    color: #f70b4e;
    transform: scale(1.05);
  }
`;
