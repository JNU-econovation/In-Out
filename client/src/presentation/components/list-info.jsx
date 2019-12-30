import React from "react";
import styled from "styled-components";

export const ListInfoLabel = props => {
  const { subject, value } = props;
  return (
    <LineWrapper>
      <BlockLabel>{subject}</BlockLabel>
      <BlockLabelWrapper>
        <BlockLabel>{value}</BlockLabel>
      </BlockLabelWrapper>
    </LineWrapper>
  );
};

export const ListInfoInput = ({ subject }) => {
  return (
    <LineWrapper>
      <BlockLabel>{subject}</BlockLabel>
      <BlockInput></BlockInput>
    </LineWrapper>
  );
};

const LineWrapper = styled.section`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BlockLabel = styled.label`
  display: inline-block;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const BlockLabelWrapper = styled.section`
  width: 50%;
`;

const BlockInput = styled.input`
  display: inline-block;
  width: 50%;
  height: ${({ theme }) => theme.mainFontSize};
`;
