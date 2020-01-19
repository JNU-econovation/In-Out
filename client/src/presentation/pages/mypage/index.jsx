import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { UpdateFrom } from "./update-form";
import { ListInfoInput, ListInfoLabel } from "../../components/list-info";
import { Service } from "@service";

export const MyPage = () => {
  const buttonElement = useRef(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordForCheck, setNewPasswordForCheck] = useState("");

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangeNewPassword = e => {
    setNewPassword(e.target.value);
  };

  const onChangeCheckNewPassword = e => {
    setNewPasswordForCheck(e.target.value);
  };

  const checkFull = useCallback(
    (password, newPassword, newPasswordForCheck) => {
      if (password && newPassword && newPasswordForCheck) {
        return buttonElement.current.removeAttribute("disabled");
      }
      return buttonElement.current.setAttribute("disabled", "true");
    },
    []
  );

  useEffect(() => {
    checkFull(password, newPassword, newPasswordForCheck);
  }, [password, newPassword, newPasswordForCheck, checkFull]);

  const changePassword = async () => {
    try {
      const result = await Service.userService.updatePassword(
        password,
        newPassword
      );
      alert(result.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <StyledBox>
      <UpdateFrom>
        <ListInfoLabel subject={"이름"} value={"김기표"}></ListInfoLabel>
        <ListInfoInput
          value={password}
          onChange={onChangePassword}
          subject={"기존 비밀번호"}
        ></ListInfoInput>
        <ListInfoInput
          value={newPassword}
          onChange={onChangeNewPassword}
          subject={"변경 비밀번호"}
        ></ListInfoInput>
        <ListInfoInput
          value={newPasswordForCheck}
          onChange={onChangeCheckNewPassword}
          subject={"변경 비밀번호 확인"}
        ></ListInfoInput>
        <button ref={buttonElement} onClick={changePassword} disabled>
          비밀번호 변경
        </button>
      </UpdateFrom>
    </StyledBox>
  );
};

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
`;
