import React, { Component } from "react";
import styled from "styled-components";
import Clock from "react-live-clock";

class Register extends Component {
  render() {
    return (
      <RegisterBox>
        <label>Register</label>
        <NamedInputBox>
          <InputLabel>이름</InputLabel>
          <InputLabel>김키키</InputLabel>
        </NamedInputBox>
        <NamedInputBox>
          <InputLabel>날짜</InputLabel>
          <ClockBox>
            <Clock
              format={"YYYY 년 MM 월 DD 일"}
              ticking={true}
              timezone={"KR"}
            />
          </ClockBox>
        </NamedInputBox>
        <NamedInputBox>
          <InputLabel>사유</InputLabel>
        </NamedInputBox>
        <button>Register</button>
      </RegisterBox>
    );
  }
}

export default Register;

const RegisterBox = styled.section`
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
