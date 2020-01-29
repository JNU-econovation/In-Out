import React from "react";
import styled from "styled-components";
import { useAuthState } from "data/context/auth-context";
import { useHistory } from "react-router-dom";

export const MainHeader = () => {
  const auth = useAuthState();
  const history = useHistory();
  return (
    <Header>
      <Box></Box>
      <BlockSpan onClick={() => history.push("/")}>ECONOVATION</BlockSpan>
      <Box>
        <TopButton>마에피에지</TopButton>
        {auth ? <TopButton>로그아웃</TopButton> : <TopButton>로그인</TopButton>}
      </Box>
    </Header>
  );
};

const TopButton = styled.button`
  width: 98px;
  border: 2px solid #ffffff;
  -webkit-appearance: none;
  height: 36px;
  background-color: inherit;
  color: white;
  font-weight: 600;
  font-size: ${({ theme }) => theme.smallFontSize};
  padding: 1px;
  line-height: 36px;
  transition: 200ms;

  :hover {
    background-color: black;
  }
  :active {
    background-color: white;
    color: #203982;
    outline: none;
  }

  :focus {
    outline: none;
  }
  @media all and (max-width: 720px) {
    display: none;
  }
`;

const Box = styled.section`
  display: flex;
  align-items: center;
  height: 100%;
  width: 250px;
  margin-left: 16px;
  margin-right: 16px;

  @media all and (max-width: 720px) {
    justify-content: flex-end;
  }

  @media all and (min-width: 721px) {
    justify-content: space-around;
  }
`;

const BlockSpan = styled.span`
  font-size: 18pt;
  font-weight: bolder;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #203982;
  color: white;
`;
