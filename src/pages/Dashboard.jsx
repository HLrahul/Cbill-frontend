import styled from "styled-components";

import Tabs from "../components/Tabs";
import Cash from "../components/Dashboard Pages/Cash";
import DashBG from "../assets/dashboardBG.jpg";
import Popup from "../components/Popup";

function Dashboard() {
  return (
    <DashWrapper>
      <Tabs />

      <Cash />
    </DashWrapper>
  );
}

export default Dashboard;

const DashWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  /* background-image: url(${DashBG});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; */
  background: black;
`;
