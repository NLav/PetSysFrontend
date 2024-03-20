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
  ${() => css`
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
      color: var(--primary);
      animation: ${spin} infinite linear 2s;
    }
  `}
`;
