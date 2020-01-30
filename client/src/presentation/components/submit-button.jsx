import React from "react";
import styled from "styled-components";

export const SubmitButton = ({ type, onClick, children, disabled = false }) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: 200px;
  -webkit-appearance: none;
  border: none;
  height: 35px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.smallFontSize};
  margin: 8px;
  background-color: #203982;
  color: white;
  :hover {
    background-color: #20398290;
  }

  :active {
    background-color: #102972;
  }

  :focus {
    outline: none;
  }

  :disabled {
    background-color: #20398290;
  }
`;
