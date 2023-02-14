import { useState } from "react";

import styled from "styled-components";
import axios from "../api/axios";

const REGISTER_URL = "register/";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [msg, setMsg] = useState("");

  const RegisterHandler = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setMsg("Password Doesn't Match!");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password, password2 }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      setMsg("User Registered Successfully!");
    } catch (err) {
      if (!err?.response) {
        setMsg("NO SERVER RESPONSE");
      } else {
        setMsg("SOMETHING WENT WRONG!");
      }
    }
  };

  return (
    <Section id="register">
      <RegisterWrapper>
        <RegisterForm>
          <Message> {msg} </Message>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#3fc0e0",
              letterSpacing: "2px",
            }}
          >
            REGISTER
          </h1>
          <Form onSubmit={RegisterHandler}>
            <InputPair>
              <label
                style={{ color: "white", paddingBottom: "10px" }}
                htmlFor="name"
              >
                Username
              </label>
              <Input
                autoComplete="off"
                type="text"
                name="name"
                onChange={(e) => setUsername(e.target.value)}
                required
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
                required
              />
            </InputPair>
            <InputPair>
              <label
                style={{ color: "white", paddingBottom: "10px" }}
                htmlFor="password2"
              >
                Retype Password
              </label>
              <Input
                type="password"
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </InputPair>
            <Button>Register</Button>
          </Form>
        </RegisterForm>
      </RegisterWrapper>
    </Section>
  );
}

export default Register;

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

const RegisterWrapper = styled.div``;
const RegisterForm = styled.div``;

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
