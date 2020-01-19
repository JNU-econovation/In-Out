import React, { useState } from "react";
import styled from "styled-components";
import { Service } from "@service";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthDispatch } from "data/context/auth-context";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const authDispatch = useAuthDispatch();
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const login = async function() {
    try {
      await Service.authService.login(id, password);
      authDispatch({
        type: "LOGIN"
      });
      history.replace(from);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleIdChange = event => {
    setId(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <LoginBox>
      <label>Login</label>
      <NamedInputBox>
        <InputLabel>학번</InputLabel>
        <NamedInput type="id" value={id} onChange={handleIdChange}></NamedInput>
      </NamedInputBox>
      <NamedInputBox>
        <InputLabel>비밀번호</InputLabel>
        <NamedInput
          type="password"
          value={password}
          onChange={handlePasswordChange}
        ></NamedInput>
      </NamedInputBox>
      <button type="button" onClick={login}>
        LOGIN
      </button>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.section`
  box-sizing: border-box;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  @media all and (max-width: 375px) {
    width: 100%;
  }
  @media all and (min-width: 376px) {
    width: 100%;
  }
  @media all and (min-width: 501px) {
    min-width: 375px;
    width: 500px;
    border: 1px solid black;
  }
`;

const NamedInputBox = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 375px) {
    flex-wrap: wrap;
  }
`;

const InputLabel = styled.label`
  width: 130px;
`;

const NamedInput = styled.input`
  width: 100%;
`;
