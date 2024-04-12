import styled, { css, keyframes } from "styled-components";

const showText = keyframes`
  from {
    translate: 10px -50%;
  }

  to {
    translate: 20px -50%;
  }
`;

export const Container = styled.div`
  ${() => css`
    position: relative;
  `}
`;

export const Text = styled.span`
  ${({ theme }) => css`
    position: absolute;
    inset: 50% auto auto 100%;
    translate: 20px -50%;
    padding: 16px;
    border-radius: 8px;
    background-color: ${theme.secondary};
    animation: ${showText} 0.2s linear;
    box-shadow: ${theme.boxShadow};
    z-index: 2;
  `}
`;
