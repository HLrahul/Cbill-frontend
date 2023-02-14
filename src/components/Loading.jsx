import styled from "styled-components";

function Loading() {
  return (
    <LoadingWrapper>
      <LoadGears>
        <Span className="clock">⚙️</Span>
        <Span className="antiClock">⚙️</Span>
      </LoadGears>
    </LoadingWrapper>
  );
}
export default Loading;

const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2f3136;
`;

const LoadGears = styled.div`
  height: 20%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span`
  position: absolute;
  font-size: 2rem;

  &.clock {
    margin-top: -3.75rem;
    margin-left: -3rem;
    font-size: 3rem;
    animation: clock 2s infinite linear;
  }
  &.antiClock {
    animation: antiClock 2s infinite linear;
  }

  @keyframes clock {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  @keyframes antiClock {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-359deg);
    }
  }
`;
