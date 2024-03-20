import styled, { css, keyframes } from "styled-components";

const showToast = keyframes`
  0% {
    transform: translateX(100%);
  }

  10% {
    transform: translateX(0);
  }

  90% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
`;

const toastCountdownBar = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
`;

export const Container = styled.div`
  ${() => css`
    position: absolute;
    inset: 10% 0 auto auto;
    display: flex;
    gap: 16px;
    justify-content: start;
    align-items: center;
    height: 80px;
    width: 360px;
    padding: 0 16px;
    border-radius: 16px 0 0 16px;
    transform: translateX(100%);
    box-shadow: var(--box-shadow);
    animation: ${showToast} 4s linear;
    z-index: 100;
    color: var(--white);
  `}
`;

export const CloseButton = styled.button`
  ${() => css`
    position: absolute;
    inset: 8px 8px auto auto;
    color: var(--white);
  `}
`;

export const TextContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `}
`;

export const Title = styled.span`
  ${() => css`
    font-size: 1.25rem;
  `}
`;

export const Description = styled.span`
  ${() => css`
    font-size: 0.9rem;
  `}
`;

export const CountdownBar = styled.div`
  ${() => css`
    position: absolute;
    inset: auto 2px 0;
    display: flex;
    width: 0;
    height: 8px;
    border-radius: 0 0 16px 16px;
    animation: ${toastCountdownBar} calc(4s - 0.4s) linear;

    background-color: var(--white);
  `}
`;
