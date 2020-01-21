import React from "react";
import styled from "styled-components";

export const ListInfoLabel = props => {
  const { subject, value } = props;
  return (
    <LineWrapper>
      <BlockLabel>{subject}</BlockLabel>
      <BlockLabelWrapper>
        <BlockLabel2>{value}</BlockLabel2>
      </BlockLabelWrapper>
    </LineWrapper>
  );
};

export const ListInfoInput = ({
  subject,
  value,
  onChange = undefined,
  onBlur = undefined
}) => {
  return (
    <LineWrapper>
      <BlockLabel>{subject}</BlockLabel>
      <BlockInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></BlockInput>
    </LineWrapper>
  );
};

const LineWrapper = styled.section`
  width: 90%;
  margin-bottom: 20px;
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
  margin-right: 10px;
  width: auto;
  font-weight: bolder;
  margin-bottom: 10px;
`;

const BlockLabel2 = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 100%;
  font-weight: bolder;
`;

const BlockLabelWrapper = styled.section`
  width: 100%;
  color: grey;
  padding: 0px;
`;

const BlockInput = styled.input`
  display: inline-block;
  width: 100%;
  height: ${({ theme }) => theme.mainFontSize};
`;
