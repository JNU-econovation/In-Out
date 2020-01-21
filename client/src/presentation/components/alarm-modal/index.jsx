import * as React from "react";
import styled from "styled-components";

export const AlarmModal = ({ children }) => {
  return <ModalBackground>{children}</ModalBackground>;
};

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
  background-color: #00000060;
`;
