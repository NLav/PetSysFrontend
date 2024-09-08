import styled, { css, keyframes } from "styled-components";
import { IModalProps } from "./Modal";

const showModal = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Background = styled.div`
  ${() => css`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000088;
    z-index: 100;
  `}
`;

export const Container = styled.div<{
  $width: IModalProps["width"];
  $height: IModalProps["height"];
}>`
  ${({ theme, $width, $height }) => css`
    width: ${$width};
    height: ${$height};
    padding: 16px;
    border-radius: 16px;
    background-color: ${theme.white};
    color: ${theme.black};
    box-shadow: ${theme.boxShadow};
    animation: ${showModal} 0.2s linear;
    transform-origin: center center;
    transition: 0;

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
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;
    color: ${theme.black};
  `}
`;

export const Header = styled(Footer)`
  ${({ theme }) => css`
    & > * {
      color: ${theme.black};
    }
  `}
`;
