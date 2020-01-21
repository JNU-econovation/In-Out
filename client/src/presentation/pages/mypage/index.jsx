import React, { useState } from "react";
import styled from "styled-components";
import { UpdateFrom } from "./update-form";
import { ListInfoInput, ListInfoLabel } from "../../components/list-info";
import { Service } from "@service";
import { ErrorLabel } from "presentation/components/error-label";

export const MyPage = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordForCheck, setNewPasswordForCheck] = useState("");
  const [isconfirmedPassword, setIsConfirmedPassword] = useState(true);
  const { userService } = Service;

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const checkConfirmedPassword = e => {
    setIsConfirmedPassword(
      userService.validatePasswordForCheck(newPassword, e.target.value)
    );
  };

  const onChangeNewPassword = e => {
    setNewPassword(e.target.value);
  };

  const onChangeCheckNewPassword = e => {
    setNewPasswordForCheck(e.target.value);
  };

  const checkFull = () => {
    return !(password && newPassword && newPasswordForCheck);
  };

  const changePassword = async () => {
    try {
      const result = await userService.updatePassword(password, newPassword);
      alert(result.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <StyledBox>
      <UpdateFrom>
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
            onBlur={checkConfirmedPassword}
            subject={"변경 비밀번호"}
            inputType="password"
          ></ListInfoInput>
          <ListInfoInput
            value={newPasswordForCheck}
            onChange={onChangeCheckNewPassword}
            onBlur={checkConfirmedPassword}
            subject={"변경 비밀번호 확인"}
            inputType="password"
          >
            <div style={{ height: "10px" }}>
              <ErrorLabel>
                {isconfirmedPassword ? "" : "입력하신 비밀번호와 다릅니다."}
              </ErrorLabel>
            </div>
          </ListInfoInput>
        </div>
        <Button onClick={changePassword} disabled={checkFull()}>
          비밀번호 변경
        </Button>
      </UpdateFrom>
    </StyledBox>
  );
};

const Button = styled.button`
  width: 200px;
  border: 0;
  -webkit-appearance: none;
  height: 30px;
  background-color: #203982;
  color: white;
  font-weight: 600;
  font-size: 10pt;

  :disabled {
    background-color: #20398290;
  }
`;

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #fbfcfc;
  color: black;
`;
