import { useState } from "react";
import { login } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import axios from "../api/axios";

const LOGIN_URL = "login/";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const LoginHandler = async (e) => {
    let response;
    e.preventDefault();

    try {
      response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data?.access));

      setMsg("Login Successful!");
    } catch (err) {
      if (!err?.response) {
        console.log("NO SERVER RESPONSE");
        setMsg("NO SERVER RESPONSE!");
      } else {
        console.log("SOMETHING WRONG!");
        setMsg("SOMETHING WENT WRONG!");
      }
    }
    dispatch(
      login({
        username: username,
        accessToken: response?.data?.access,
      })
    );
    const userName = useSelector((state) => state.user.value.userName);
    const accessToken = useSelector(
      (state) => state.user.value.userAccessToken
    );
    console.log("USER NAME STORED IN STORE = " + userName);
    console.log("USER ACESS TOKEN STORED IN STORE = " + accessToken);
  };

  return (
    <Section id="login">
      <LoginWrapper>
        <LoginForm>
          <Message> {msg} </Message>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#3fc0e0",
              letterSpacing: "2px",
            }}
          >
            LOGIN
          </h1>
          <Form onSubmit={LoginHandler}>
            <InputPair>
              <label
                style={{ color: "white", paddingBottom: "10px" }}
                htmlFor="name"
              >
                Username
              </label>
              <Input
                type="text"
                name="name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputPair>
            <InputPair>
              <label
                style={{ color: "white", paddingBottom: "10px" }}
                htmlFor="password"
              >
                Password
              </label>
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
  height: 5vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3fc0e0;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  min-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWrapper = styled.div``;
const LoginForm = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputPair = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;
const Input = styled.input`
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px black inset !important;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #3fc0e0 !important;
  }

  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  color: #3fc0e0;
  padding-bottom: 5px;
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
  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
    background: #3fc0e0;
  }
`;
