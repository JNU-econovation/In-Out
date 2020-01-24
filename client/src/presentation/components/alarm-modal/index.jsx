import * as React from "react";
import styled from "styled-components";
import { XButton } from "../x-button";

export const AlarmModal = ({ title, children, onClick }) => {
  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <span style={{ marginTop: "4px", display: "block" }}>{title}</span>
          <XButton onClick={onClick}></XButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </ModalBackground>
  );
};

const ModalBody = styled.span`
  display: inline-block;
  margin: 16px;
`;

const ModalHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
  top: 0px;
  height: 32px;
  width: 100%;
  border-bottom: 1px solid black;
`;

const Modal = styled.section`
  padding: 8px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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

const ModalBackground = styled.section`
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0px;
  margin: 0;
  padding: 0;
  height: inherit;
  width: 100vw;
  height: 100vh;
  background-color: #00000030;
  transition: 200ms;
`;
