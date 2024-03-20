import styled, { css, keyframes } from "styled-components";

const showComboboxOptions = keyframes`
  from {
      transform: translateY(100%);
      opacity: 0;
    }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: ${theme.gray4};
    z-index: 1;

    & > input {
      width: 100%;
      padding: 4px 8px;
      border: 2px solid ${theme.primary};
      border-radius: 8px;
      background-color: ${theme.white};

      &:disabled {
        background-color: ${theme.gray1};
        cursor: not-allowed;

        & ~ label {
          background-color: ${theme.gray1};
          cursor: not-allowed;
        }
      }
    }

    & > label {
      z-index: -2;

      font-size: 0.9rem;
    }
  `}
`;

export const OptionsContainer = styled.div<{
  optionsPosition: "top" | "bottom";
}>`
  ${({ theme, optionsPosition }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border: 2px solid ${theme.primary};
    border-radius: 8px;
    background-color: ${theme.white};
    box-shadow: ${theme.boxShadow};
    overflow: auto;
    animation: ${showComboboxOptions} 0.2s linear;
    z-index: -1;

    ${optionsPosition === "top"
      ? css`
          inset: auto 0 calc(100% - 1rem);
        `
      : css`
          inset: 100% 0 auto;
        `}

    & > button {
      padding: 4px 8px;

      font-size: 1rem;

      &:not(:last-child) {
        border-bottom: 2px solid ${theme.gray2};
      }

      &:first-child {
        border-radius: 8px 8px 0 0;
      }

      &:last-child {
        border-radius: 0 0 8px 8px;
      }

      &:hover {
        background-color: ${theme.gray2};
      }
    }
  `}
`;
