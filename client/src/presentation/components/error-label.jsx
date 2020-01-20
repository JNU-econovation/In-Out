import * as React from "react";
import styled from "styled-components";

export const ErrorLabel = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
};

const StyledLabel = styled.label`
  color: red;
  font-size: 9pt;
`;
