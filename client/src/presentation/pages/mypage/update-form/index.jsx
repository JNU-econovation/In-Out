import React from "react";
import styled from "styled-components";

export const UpdateFrom = ({ children }) => {
  return <UpdateFromWapper>{children}</UpdateFromWapper>;
};

const UpdateFromWapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${({ theme }) => theme.smallFontSize};

  @media all and (min-width: 768px) {
    width: 90%;
    font-size: ${({ theme }) => theme.mainFontSize};
  }

  @media all and (min-width: 768px) and (max-width: 1024px) {
    width: 70%;
    font-size: ${({ theme }) => theme.mainFontSize};
  }

  @media all and (min-width: 1025px) {
    width: 60%;
    font-size: ${({ theme }) => theme.mainFontSize};
  }
`;
