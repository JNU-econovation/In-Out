import React from "react";
import styled from "styled-components";

export const UpdateFrom = ({ children }) => {
  return <UpdateFromWapper>{children}</UpdateFromWapper>;
};

const UpdateFromWapper = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ theme }) => theme.smallFontSize};
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 1px 5px grey;
  padding: 40px;
  background-color: #ffffff;

  @media all and (max-width: 375px) {
    width: 300px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 376px) and (max-width: 720px) {
    width: 350px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 721px) and (max-width: 1024px) {
    width: 400px;
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 1025px) {
    width: 450px;
    font-size: ${({ theme }) => theme.mainFontSize};
  }
`;
