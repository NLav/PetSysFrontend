import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
      color: ${theme.primary};
      animation: ${spin} infinite linear 2s;
    }
  `}
`;
