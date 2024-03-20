import styled, { css, keyframes } from "styled-components";

const showText = keyframes`
  from {
    transform: translate(10px, -50%);
  }

  to {
    transform: translate(20px, -50%);
  }
`;

export const Container = styled.div`
  ${() => css`
    position: relative;
  `}
`;

export const Text = styled.span`
  ${() => css`
    position: absolute;
    inset: 50% auto auto 100%;
    transform: translate(20px, -50%);
    padding: 16px;
    border-radius: 8px;
    background-color: var(--secondary);
    animation: ${showText} 0.2s linear;
    box-shadow: var(--box-shadow);
    z-index: 1;
  `}
`;
