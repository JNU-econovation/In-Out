import React from "react";
import styled from "styled-components";
import { useAuthState, useAuthDispatch } from "data/context/auth-context";
import { useHistory } from "react-router-dom";
import { Service } from "@service";
import hamburgerButton from "assets/hamberger.png";

export const MainHeader = ({ onModal }) => {
  const auth = useAuthState();
  const history = useHistory();
  const { userService } = Service;
  const authDispatch = useAuthDispatch();

  const logout = async function() {
    try {
      const result = await Service.authService.logout();
      if (!result) {
        history.push("/");
      }
      authDispatch({
        type: "CHANGE",
        value: false
      });
      history.push("/login");
    } catch (error) {
      history.push("/");
    }
  };

  return (
    <Header>
      <Box>
        {auth && userService.getUser().role >= 1 ? (
          <TopButton2 onClick={() => history.push("/admin")}>Admin</TopButton2>
        ) : null}
      </Box>
      <BlockSpan onClick={() => history.push("/")}>ECONOVATION</BlockSpan>
      <Box>
        {auth ? (
          <>
            <TopButton onClick={() => history.push("/mypage")}>
              마이페이지
            </TopButton>
            <TopButton onClick={logout}>로그아웃</TopButton>
          </>
        ) : (
          <TopButton>로그인</TopButton>
        )}
        <Img src={hamburgerButton} onClick={onModal}></Img>
      </Box>
    </Header>
  );
};

const Img = styled.img`
  height: 32px;
  width: auto;
  @media all and (min-width: 721px) {
    display: none;
  }
`;

const TopButton2 = styled.button`
  width: 60px;
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

  @media all and (max-width: 720px) {
    :active {
      background-color: white;
      color: #203982;
      outline: none;
    }
  }
  @media all and (min-width: 721px) {
    :hover {
      background-color: black;
    }

    :active {
      background-color: white;
      color: #203982;
      outline: none;
    }
  }
  :focus {
    outline: none;
  }
`;

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

  @media all and (max-width: 720px) {
    display: none;
    :active {
      background-color: white;
      color: #203982;
      outline: none;
    }
  }
  @media all and (min-width: 721px) {
    :hover {
      background-color: black;
    }

    :active {
      background-color: white;
      color: #203982;
      outline: none;
    }
  }
  :focus {
    outline: none;
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
    justify-content: center;
    width: 72px;
    margin-left: 8px;
    margin-right: 8px;
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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #203982;
  color: white;
`;
