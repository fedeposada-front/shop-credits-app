import styled from "styled-components";

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: #222;
  color: white;

  &:hover {
    background-color: #000;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
    transform: none;
  }
`;

export default Button;