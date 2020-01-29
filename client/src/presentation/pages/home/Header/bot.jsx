import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useAuthState } from "data/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";

export const Bot = () => {
  const location = useLocation();
  const history = useHistory();
  const auth = useAuthState();
  const [state, setState] = useState({
    login: false,
    mypage: false,
    register: false
  });
  useEffect(() => {
    let element;
    switch (location.pathname) {
      case "/":
        setState({
          login: false,
          mypage: false,
          register: true
        });
        break;
      case "/mypage":
        setState({
          login: false,
          mypage: true,
          register: false
        });
        break;
      case "/login":
        setState({
          login: true,
          mypage: false,
          register: false
        });
        break;
    }
  }, [location]);

  return (
    <BottomNavBox>
      <NavButton
        active={state.mypage}
        disabled={state.mypage}
        onClick={() => history.push("/mypage")}
      >
        마이페이지
      </NavButton>
      <NavButton
        active={state.register}
        disabled={state.register}
        onClick={() => history.push("/")}
      >
        출입신청
      </NavButton>
      {auth ? (
        <NavButton>로그아웃</NavButton>
      ) : (
        <NavButton
          active={state.login}
          disabled={state.login}
          onClick={() => history.push("/login")}
        >
          로그인
        </NavButton>
      )}
    </BottomNavBox>
  );
};

const NavButton = styled.section`
  text-align: center;
  height: 100%;
  line-height: 50px;
  color: gray;
  width: calc(100% / 3);
  ${props => {
    if (props.active) {
      return css`
        color: #203982;
        font-weight: bolder;
      `;
    }
  }}
`;

const BottomNavBox = styled.section`
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: calc(100vh - 50px);
  height: 50px;
  box-shadow: 0px -1px 2px grey;
  font-size: 10pt;
  border-top: none;
  width: 100%;
  @media all and (min-width: 721px) {
    display: none;
  }
`;