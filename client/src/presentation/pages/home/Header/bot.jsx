import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useAuthState, useAuthDispatch } from "data/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { Service } from "@service";

export const Bot = ({ closeModal }) => {
  const location = useLocation();
  const history = useHistory();
  const auth = useAuthState();
  const authDispatch = useAuthDispatch();
  const [state, setState] = useState({
    login: false,
    mypage: false,
    register: false
  });

  useEffect(() => {
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
      default:
        setState({
          login: false,
          mypage: false,
          register: false
        });
    }
  }, [location]);

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
      closeModal();
      history.push("/login");
    } catch (error) {
      history.push("/");
    }
  };

  return (
    <BottomNavBox>
      <NavButton
        active={state.mypage}
        disabled={state.mypage}
        onClick={() => {
          closeModal();
          history.push("/mypage");
        }}
      >
        마이페이지
      </NavButton>
      <NavButton
        active={state.register}
        disabled={state.register}
        onClick={() => {
          closeModal();
          history.push("/");
        }}
      >
        출입신청
      </NavButton>
      {auth ? (
        <NavButton onClick={logout}>로그아웃</NavButton>
      ) : (
        <NavButton
          active={state.login}
          disabled={state.login}
          onClick={() => {
            closeModal();
            history.push("/login");
          }}
        >
          로그인
        </NavButton>
      )}
    </BottomNavBox>
  );
};

const NavButton = styled.section`
  text-align: left;
  border-bottom: 1px solid gray;
  height: 50px;
  line-height: 50px;
  color: gray;
  width: 100%;
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
  box-sizing: border-box;
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 14pt;
  width: 100vw;

  @media all and (min-width: 721px) {
    display: none;
  }
`;
