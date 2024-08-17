import styled, { css, keyframes } from "styled-components";

const showActionBarModal = keyframes`
  from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 100% 0 auto auto;
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 16px;
    overflow: hidden;
    border-radius: 16px;
    background-color: ${theme.white};
    box-shadow: ${theme.boxShadow};
    animation: ${showActionBarModal} 0.2s linear;
    z-index: 100;

    * {
      color: ${theme.black};
    }

    & > div {
      border-bottom: 2px solid ${theme.gray2};
      margin-bottom: 16px;
      padding-bottom: 16px;

      &:last-child {
        margin: 0;
        padding: 0;
        border: none;
      }
    }

    @media (max-width: 500px) {
      position: fixed;
      inset: 10% 0 auto auto;
      width: 90vw;
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
