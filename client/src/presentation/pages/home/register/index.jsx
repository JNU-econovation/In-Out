import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import Moment from "react-moment";
import { Service } from "@service";
import { ListInfoLabel } from "presentation/components/list-info";
import { SubmitButton } from "presentation/components/submit-button";
import { AlarmModal } from "presentation/components/alarm-modal";
import { ErrorLabel } from "presentation/components/error-label";
import "moment-timezone";

const options = [
  { value: "공부", label: "공부" },
  { value: "회의", label: "회의" },
  { value: "개발", label: "개발" },
  { value: "동아리 운영", label: "동아리 운영" }
];

const Register = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAlreadyEnrole, setIsAlreadyEnrole] = useState(false);
  const [modal, setModal] = useState({ on: false, message: "", title: "" });
  const { userService, registerService } = Service;
  const closeModal = () => {
    setModal({ on: false, message: "", title: "" });
  };

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    checkEnrollmentAlready();
  }, [setSelectedOption, setIsAlreadyEnrole]);

  const checkEnrollmentAlready = async () => {
    try {
      const { status, data } = await registerService.get();
      const { result } = data;
      if (status !== 200 || !result) {
        setIsAlreadyEnrole(false);
        return;
      }

      const { reason } = result;

      setSelectedOption({
        value: reason,
        label: options.find(s => {
          console.log(s.value, reason);
          return s.value === reason;
        }).label
      });
      setIsAlreadyEnrole(true);
    } catch (error) {
      setModal({
        on: true,
        message: error.response.data.message,
        title: "오류"
      });
    }
  };

  const onUpdate = async () => {
    try {
      const result = await registerService.update(selectedOption.value);
      if (result.status === 200) {
        checkEnrollmentAlready();
        setModal({
          on: true,
          message: "수정되었습니다",
          title: "성공"
        });
      }
    } catch (error) {
      setModal({
        on: true,
        message: error.response.data.message,
        title: "오류"
      });
    }
  };

  const onSubmit = async () => {
    try {
      const result = await registerService.register(selectedOption.value);
      if (result.status === 200) {
        checkEnrollmentAlready();
        setModal({
          on: true,
          message: "신청되웠습니다.",
          title: "성공"
        });
      }
    } catch (error) {
      setModal({
        on: true,
        message: error.response.data.message,
        title: "오류"
      });
    }
  };

  return (
    <RegisterBox>
      <RegisterFrom>
        {modal.on ? (
          <AlarmModal title={modal.title} onClick={closeModal}>
            {modal.message}
          </AlarmModal>
        ) : null}
        <Header1>출입신청</Header1>
        <ListInfoLabel>
          <div style={{ height: "16px", width: "100%" }}>
            <ErrorLabel>
              {isAlreadyEnrole ? "이미 신청이 완료 되었습니다." : ""}
            </ErrorLabel>
          </div>
        </ListInfoLabel>

        <ListInfoLabel
          subject={"이름"}
          value={userService.getUser().name}
        ></ListInfoLabel>
        <ListInfoLabel subject={"날짜"}>
          <Moment
            interval={1000}
            format={"YYYY/MM/DD A hh:mm"}
            tz="Asia/Seoul"
          ></Moment>
        </ListInfoLabel>
        <ListInfoLabel subject={"사유"}>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </ListInfoLabel>
        {isAlreadyEnrole ? (
          <SubmitButton onClick={onUpdate}>수정하기</SubmitButton>
        ) : (
          <SubmitButton onClick={onSubmit}>출입신청</SubmitButton>
        )}
      </RegisterFrom>
    </RegisterBox>
  );
};

export default Register;

const Header1 = styled.h1`
  margin-bottom: 0;
`;

const RegisterFrom = styled.section`
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

const RegisterBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: #fbfcfc;
  color: black;
`;
