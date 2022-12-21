import styled from "styled-components";

function Tabs() {
  return (
    <TabsWrapper>
      <TabLinks>
        <Ullist>
          <StyledTabLinks>CASH</StyledTabLinks>
          <StyledTabLinks>CREDIT</StyledTabLinks>
          <StyledTabLinks>RECORDS</StyledTabLinks>
        </Ullist>
      </TabLinks>
    </TabsWrapper>
  );
}

export default Tabs;

const TabsWrapper = styled.section`
  height: 10vh;
  width: 100%;
`;

const TabLinks = styled.div`
  height: 10vh;
  width: 100%;
`;

const Ullist = styled.ul`
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
