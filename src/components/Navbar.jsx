import styled from "styled-components";
import { NavLink } from "react-router-dom";

import infoPNG from "../assets/info.png";
import billingPNG from "../assets/billing.png";

function Navbar() {
  return (
    <NavbarWrapper>
      <NavBar>
        <ImgDiv>
          <StyledImg src={billingPNG} alt="logo" />
        </ImgDiv>
        <div>
          <Ullist>
            <StyledNavLink to="/login"> Login </StyledNavLink>

            <StyledNavLink to="/info">
              <ImgDiv>
                <StyledImg src={infoPNG} alt="info" />
              </ImgDiv>
            </StyledNavLink>
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
`;

const NavBar = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
`;

const StyledImg = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`;

const Ullist = styled.ul`
  height: 100%;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
`;

const ImgDiv = styled.div`
  background: white;
  display: flex;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 900;
  color: white;
`;
