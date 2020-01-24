import React from "react";
import styled from "styled-components";

export const SubmitButton = ({ onClick, children, disabled = false }) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: 200px;
  border: 0;
  -webkit-appearance: none;
  height: 35px;
  background-color: #203982;
  color: white;
  font-weight: 600;
  font-size: ${({ theme }) => theme.smallFontSize};
  margin: 8px;
  :disabled {
    background-color: #20398290;
  }
`;
