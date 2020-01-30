import React from "react";
import styled from "styled-components";

export const ListInfoLabel = props => {
  const { subject, value, children } = props;
  return (
    <LineWrapper>
      <BlockLabel>{subject}</BlockLabel>
      <BlockLabelWrapper>
        <BlockLabel2>{value}</BlockLabel2>
        {children}
      </BlockLabelWrapper>
    </LineWrapper>
  );
};

export const ListInfoInput = ({
  subject,
  value,
  onChange = undefined,
  onBlur = undefined,
  children,
  inputType = "text"
}) => {
  return (
    <LineWrapper>
      <BlockLabel>{subject}</BlockLabel>
      <BlockInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={inputType}
        autoComplete="off"
      ></BlockInput>
      {children}
    </LineWrapper>
  );
};

const LineWrapper = styled.section`
  width: 90%;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media all and (max-width: 375px) {
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 376px) and (max-width: 721px) {
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 720px) and (max-width: 1024px) {
    font-size: ${({ theme }) => theme.smallFontSize};
  }

  @media all and (min-width: 1025px) {
    font-size: ${({ theme }) => theme.mainFontSize};
  }
`;

const BlockLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 8px;
  width: auto;
  font-weight: 900;
  margin-bottom: 8px;
`;

const BlockLabel2 = styled.label`
  display: flex;
  align-items: center;
  margin-right: 8px;
  width: 100%;
  font-weight: bolder;
  font-size: ${({ theme }) => theme.mainFontSize};
`;

const BlockLabelWrapper = styled.section`
  width: 100%;
  color: grey;
  padding: 0px;
`;

const BlockInput = styled.input`
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid grey;
  padding: 8px;
  width: 100%;
  height: 40px;
  font-size: ${({ theme }) => theme.mainFontSize};

  :focus {
    outline: none;
    border-color: #203982;
    border-width: 2px;
  }
`;
