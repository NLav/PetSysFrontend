import styled, { css, keyframes } from "styled-components";
import { IModalProps } from "./Modal";

const showModal = keyframes`
  from {
    transform: scale(0) translate(50%, -50%);
    opacity: 0;
  }

  to {
    transform: scale(1) translate(50%, -50%);
    opacity: 1;
  }
`;

export const Background = styled.div`
  ${() => css`
    position: fixed;
    inset: 0;
    background-color: #00000088;
    z-index: 100;
  `}
`;

export const Container = styled.div<Pick<IModalProps, "width" | "height">>`
  ${({ width, height }) => css`
    position: fixed;
    inset: 50% 50% auto auto;
    width: ${width};
    height: ${height};
    padding: 16px;
    border-radius: 16px;
    transform: scale(1) translate(50%, -50%);
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    animation: ${showModal} 0.2s linear;
    z-index: 101;
    transform-origin: top right;
    transition: 0;

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
