import styled, { css, keyframes } from "styled-components";

const showActionBarModal = keyframes`
  from {
      transform: translateX(100%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
`;

export const Container = styled.div`
  ${() => css`
    position: absolute;
    inset: 100% 0 auto auto;
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 16px;
    overflow: hidden;
    border-radius: 16px;
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    animation: ${showActionBarModal} 0.2s linear;
    z-index: 100;

    * {
      color: var(--black);
    }

    & > div {
      border-bottom: 2px solid var(--gray2);
      margin-bottom: 16px;
      padding-bottom: 16px;

      &:last-child {
        margin: 0;
        padding: 0;
        border: none;
      }
    }
  `}
`;

export const Header = styled.div`
  ${() => css`
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const Footer = Header;
