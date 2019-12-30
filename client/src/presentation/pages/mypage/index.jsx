import React from "react";
import styled from "styled-components";
import { UpdateFrom } from "./update-form";
import { ListInfoInput, ListInfoLabel } from "../../components/list-info";
export const MyPage = () => {
  return (
    <StyledBox>
      <UpdateFrom>
        <ListInfoLabel subject={"이름"} value={"김기표"}></ListInfoLabel>
        <ListInfoInput subject={"기존 비밀번호"}></ListInfoInput>
        <ListInfoInput subject={"변경 비밀번호"}></ListInfoInput>
        <ListInfoInput subject={"변경 비밀번호 확인"}></ListInfoInput>
      </UpdateFrom>
    </StyledBox>
  );
};

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
`;
