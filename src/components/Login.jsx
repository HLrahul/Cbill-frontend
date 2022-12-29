import { useState } from "react";
import { login } from "../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "../api/axios";

const LOGIN_URL = "login/";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(
        login({
          username: username,
          accessToken: response?.data?.access,
        })
      );
      setMsg("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setMsg("NO SERVER RESPONSE!");
      } else {
        setMsg("SOMETHING WENT WRONG!");
      }
    }
  };

  return (
    <Section id="login">
      <LoginWrapper>
        <LoginForm>
          <Message> {msg} </Message>
          <h1
            style={{
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: "1rem",
              color: "white",
              // color: "#3fc0e0",
              letterSpacing: "2px",
            }}
          >
            LOGIN
          </h1>
          <Form onSubmit={LoginHandler}>
            <InputPair>
              <Label htmlFor="name">Username</Label>
              <Input
                type="text"
                name="name"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputPair>
            <InputPair>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputPair>
            <Button>Login</Button>
          </Form>
        </LoginForm>
      </LoginWrapper>
    </Section>
  );
}

export default Login;

const Message = styled.div`
  font-size: 0.75rem;
  height: 5vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 0.25rem;
`;

const Section = styled.section`
  height: 50vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    height: 50vh;
  }
`;

const LoginWrapper = styled.div`
  height: 50vh;
  width: 80%;
  position: relative;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 425px) {
    width: 80%;
    height: 50vh;
  }
`;
const LoginForm = styled.div`
  height: inherit;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputPair = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 50%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 425px) {
    margin-botton: 1rem;
  }
`;
const Label = styled.label`
  color: white;
  padding-bottom: 10px;

  @media (max-width: 425px) {
    color: #f70b4e;
  }
`;
const Input = styled.input`
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #f70b4e !important;
  }

  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  padding-bottom: 5px;

  @media (max-width: 425px) {
    color: #f70b4e;
  }
`;
const Button = styled.button`
  margin-top: 0.5rem;
  background: transparent;
  border: none;
  color: white;
  text-transform: uppercase;
  font-weight: bolder;
  letter-spacing: 1px;
  width: auto;
  height: 2rem;
  width: 5rem;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem;
  transition: 0.5s;
  background: #f70b4e;
  cursor: pointer;

  &:hover {
    // transform: scale(1.05);
    background: #f70b4e;
  }
`;
