import styled from "styled-components";

import Tabs from "../components/Tabs";
import Cash from "../components/Dashboard Pages/Cash";

function Dashboard() {
  return (
    <DashWrapper>
      <Tabs />

      <Pages>
        <Cash />
      </Pages>
    </DashWrapper>
  );
}

export default Dashboard;

const DashWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: black;
`;

const Pages = styled.section``;
