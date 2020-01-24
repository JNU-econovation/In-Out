import * as React from "react";
import styled from "styled-components";
import ex from "assets/ex.png";

export const XButton = ({ onClick }) => {
  return (
    <Circle onClick={onClick}>
      <CircleImg src={ex}></CircleImg>
    </Circle>
  );
};

const CircleImg = styled.img`
  display: block;
  height: 7px;
  width: 7px;
`;

const Circle = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin: 0;
  padding: 0;
  background-color: #ff1500;
  :focus,
  :active {
    outline: none;
    background-color: #cc1000;
  }
`;
