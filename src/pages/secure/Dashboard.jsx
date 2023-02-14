// Imports
import styled from "styled-components";
import CourierStat from "../../components/CourierStat";
import { useNavigate } from "react-router-dom";

// functional Dashboard component
function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashWrapper>
      <CourierStat />

      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate("/cash");
        }}
      >
        Book Now {">"}
      </Button>
    </DashWrapper>
  );
}
export default Dashboard;

// Stylings
const DashWrapper = styled.div`
  min-height: 90vh;
  min-width: 100%;
  background: #2f3136;
`;

const Button = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 12.5rem;
  height: 2.5rem;
  width: 7rem;
  border: none;
  outline: none;
  border-radius: 50px;
  background: whitesmoke;
  font-weight: bolder;
  cursor: pointer;
  transition: 0.7s ease;

  &:hover {
    background: black;
    color: white;
  }

  @media (max-width: 768px) {
    right: 9rem;
    bottom: 3rem;
  }
`;
