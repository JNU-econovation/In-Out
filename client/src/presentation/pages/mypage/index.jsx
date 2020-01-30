import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UpdateFrom } from "./update-form";
import { ListInfoInput, ListInfoLabel } from "../../components/list-info";
import { Service } from "@service";
import { ErrorLabel } from "presentation/components/error-label";
import { AlarmModal } from "presentation/components/alarm-modal/index";
import { SubmitButton } from "presentation/components/submit-button";

export const MyPage = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordForCheck, setNewPasswordForCheck] = useState("");
  const [isconfirmedPassword, setIsConfirmedPassword] = useState(true);
  const { userService } = Service;
  const [modal, setModal] = useState({ on: false, message: "", title: "" });

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangeNewPassword = e => {
    setNewPassword(e.target.value);
  };

  const onChangeCheckNewPassword = e => {
    setNewPasswordForCheck(e.target.value);
  };

  useEffect(() => {
    setIsConfirmedPassword(
      userService.validatePasswordForCheck(newPassword, newPasswordForCheck)
    );
  }, [newPassword, newPasswordForCheck]);

  const checkFull = () => {
    return !(
      password &&
      newPassword &&
      newPasswordForCheck &&
      isconfirmedPassword
    );
  };

  const changePassword = async () => {
    try {
      await userService.updatePassword(password, newPassword);
      setModal({
        on: true,
        message: "비밀번호가 성공적으로 바뀌었습니다.",
        title: "성공"
      });
    } catch (error) {
      setModal({
        on: true,
        message: error.response.data.message,
        title: "오류"
      });
    }
  };

  const closeModal = () => {
    setModal({ on: false, message: "", title: "" });
    setPassword("");
    setNewPassword("");
    setNewPasswordForCheck("");
    setIsConfirmedPassword(true);
  };

  return (
    <StyledBox>
      <UpdateFrom>
        {modal.on ? (
          <AlarmModal title={modal.title} onClick={closeModal}>
            {modal.message}
          </AlarmModal>
        ) : null}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <ListInfoLabel
            subject={"이름"}
            value={userService.getUser().name}
          ></ListInfoLabel>
          <ListInfoInput
            value={password}
            onChange={onChangePassword}
            subject={"기존 비밀번호"}
            inputType="password"
          ></ListInfoInput>
          <ListInfoInput
            value={newPassword}
            onChange={onChangeNewPassword}
            subject={"변경 비밀번호"}
            inputType="password"
          ></ListInfoInput>
          <ListInfoInput
            value={newPasswordForCheck}
            onChange={onChangeCheckNewPassword}
            subject={"변경 비밀번호 확인"}
            inputType="password"
          >
            <div style={{ height: "16px", width: "100%" }}>
              <ErrorLabel>
                {isconfirmedPassword ? "" : "입력하신 비밀번호와 다릅니다."}
              </ErrorLabel>
            </div>
          </ListInfoInput>
        </div>
        <SubmitButton
          type="button"
          onClick={changePassword}
          disabled={checkFull()}
        >
          비밀번호 변경
        </SubmitButton>
      </UpdateFrom>
    </StyledBox>
  );
};

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: #fbfcfc;
  color: black;
`;
