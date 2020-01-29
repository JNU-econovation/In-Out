import React, { useState } from "react";
import styled from "styled-components";
import { Service } from "@service";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthDispatch } from "data/context/auth-context";
import { ListInfoInput } from "presentation/components/list-info";
import { SubmitButton } from "presentation/components/submit-button";
import { AlarmModal } from "presentation/components/alarm-modal";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ on: false, message: "", title: "" });

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
      setModal({
        on: true,
        message: error.response.data.message,
        title: "오류"
      });
    }
  };

  const handleIdChange = event => {
    setId(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const closeModal = () => {
    setModal({ on: false, message: "", title: "" });
    setPassword("");
  };

  return (
    <LoginBox>
      <LoginFrom>
        {modal.on ? (
          <AlarmModal title={modal.title} onClick={closeModal}>
            {modal.message}
          </AlarmModal>
        ) : null}
        <h1>Login</h1>
        <ListInfoInput
          subject={"학번"}
          value={id}
          onChange={handleIdChange}
        ></ListInfoInput>
        <ListInfoInput
          subject={"비밀번호"}
          type={"password"}
          value={password}
          onChange={handlePasswordChange}
        ></ListInfoInput>
        <SubmitButton onClick={login}>LOGIN</SubmitButton>
      </LoginFrom>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: #fbfcfc;
  color: black;
`;

const LoginFrom = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ theme }) => theme.smallFontSize};
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 1px 5px grey;
  padding: 32px;
  background-color: #ffffff;

  @media all and (max-width: 375px) {
    width: 300px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 376px) and (max-width: 720px) {
    width: 350px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 721px) and (max-width: 1024px) {
    width: 400px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 1025px) {
    width: 450px;
    font-size: ${({ theme }) => theme.mainFontSize};
  }
`;
