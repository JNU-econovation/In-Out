import * as React from "react";
import styled, { css } from "styled-components";

export const CheckModal = ({ children, onPositive, onNagative }) => {
  return (
    <Modal>
      <ModalBody>{children}</ModalBody>
      <ButtonWrapper>
        <PositiveButton onClick={onPositive}>보내기</PositiveButton>
        <NagativeButton onClick={onNagative}>취소</NagativeButton>
      </ButtonWrapper>
    </Modal>
  );
};
const Button = css`
  box-sizing: border-box;
  appearance: none;
  border: none;
  height: 35px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.smallFontSize};
  margin: 8px;
`;

const PositiveButton = styled.button`
  ${Button}
  border: 1px solid #203982;
  background-color: #203982;
  color: white;
  :active,
  :focus {
    outline: none;
  }
`;

const NagativeButton = styled.button`
  ${Button}
  border: 1px solid grey;
  color: black;
`;

const ButtonWrapper = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ModalBody = styled.span`
  box-sizing: content-box;
  display: inline-block;
  margin: 16px;
`;

const Modal = styled.section`
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 4px grey;
  border-radius: 5px;
  @media all and (max-width: 375px) {
    width: 250px;
    height: 125px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 376px) and (max-width: 720px) {
    width: 280px;
    height: 140px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 721px) and (max-width: 1024px) {
    width: 310px;
    height: 155px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 1025px) {
    width: 340px;
    height: 170px;
    font-size: ${({ theme }) => theme.mainFontSize};
  }
`;
