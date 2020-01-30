import React, { useState } from "react";
import styled from "styled-components";
import { CheckModal } from "presentation/components/check-modal";
import { SubmitButton } from "presentation/components/submit-button";
import { Service } from "@service";
import { useHistory } from "react-router-dom";

export const Admin = () => {
  const [onModal, setOnModal] = useState(false);
  const history = useHistory();

  const checkTrue = async () => {
    try {
      const result = await Service.mailService.submit();
      if (result) history.push("/");
      console.log("이상해");
    } catch (error) {
      console.log("?");
    }
  };

  const checkFalse = () => {
    setOnModal(false);
  };

  return (
    <StyledBox>
      {onModal ? (
        <CheckModal onPositive={checkTrue} onNagative={checkFalse}>
          "정말 메일을 보내시겠습니까?"
        </CheckModal>
      ) : null}
      <SubmitButton onClick={() => setOnModal(true)}>메일 보내기</SubmitButton>
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
