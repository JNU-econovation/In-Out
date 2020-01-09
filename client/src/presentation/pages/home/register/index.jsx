import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "react-live-clock";
import Select from "react-select";
import { Service } from "@service";
// select option
const options = [
  { value: "study", label: "공부" },
  { value: "metting", label: "회의" },
  { value: "develop", label: "개발" },
  { value: "manage", label: "동아리 운영" }
];

const valueToNumber = {
  study: 0,
  metting: 1,
  develop: 2,
  manage: 3
};

const Register = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    checkEnrollmentAlready();
  }, [setSelectedOption]);

  const checkEnrollmentAlready = async () => {
    try {
      const { status, data } = await Service.registerService.get();
      const { result } = data;
      const { reason } = result;
      console.log(reason);
      if (status !== 200) return;
      setSelectedOption({
        value: reason,
        label: options[valueToNumber[reason]].label
      });
    } catch (error) {}
  };

  const onSubmit = async () => {
    try {
      const result = await Service.registerService.register(
        selectedOption.value
      );
      if (result.status === 200) {
        checkEnrollmentAlready();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <RegisterBox>
      <label>Register</label>
      <NamedInputBox>
        <InputLabel>이름</InputLabel>
        <NamedText>김키키</NamedText>
      </NamedInputBox>
      <NamedInputBox>
        <InputLabel>날짜</InputLabel>
        <ClockBox>
          <Clock format={"YYYY년 MM월 DD일"} ticking={true} timezone={"KR"} />
        </ClockBox>
      </NamedInputBox>
      <NamedInputBox>
        <InputLabel>사유</InputLabel>
        <SelectBox>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </SelectBox>
      </NamedInputBox>
      <button onClick={onSubmit}>Register</button>
    </RegisterBox>
  );
};

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

const NamedText = styled.text`
  width: 100%;
`;

const SelectBox = styled.section`
  width: 100%;
`;

const ClockBox = styled.section`
  width: 100%;
`;
