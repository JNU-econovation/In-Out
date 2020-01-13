import React, { useState } from "react";
import styled from "styled-components";
import { UpdateFrom } from "./update-form";
import { ListInfoInput, ListInfoLabel } from "../../components/list-info";
export const MyPage = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, serCheckNewPassword] = useState("");

  const onChangePassword = e => {
    setPassword(e.targer.value);
  };

  const onChangeNewPassword = e => {
    setNewPassword(e.targer.value);
  };

  const onChangeCheckNewPassword = e => {
    serCheckNewPassword(e.targer.value);
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
          value={checkNewPassword}
          onChange={onChangeCheckNewPassword}
          subject={"변경 비밀번호 확인"}
        ></ListInfoInput>
      </UpdateFrom>
    </StyledBox>
  );
};

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
`;
