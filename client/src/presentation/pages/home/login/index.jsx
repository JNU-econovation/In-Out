import React, { Component } from "react";
import styled from "styled-components";

class Login extends Component {
  render() {
    return (
      <LoginBox>
        <label>Login</label>
        <NamedInputBox>
          <InputLabel>학번</InputLabel>
          <NamedInput></NamedInput>
        </NamedInputBox>
        <NamedInputBox>
          <InputLabel>비밀번호</InputLabel>
          <NamedInput></NamedInput>
        </NamedInputBox>
        <button>LOGIN</button>
      </LoginBox>
    );
  }
}

export default Login;

const LoginBox = styled.section`
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
