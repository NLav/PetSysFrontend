import styled, { css, keyframes } from "styled-components";

const showComboboxOptions = keyframes`
  from {
      opacity: 0;
    }

  to {
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
      height: 40px;
      padding: 4px 8px;
      border: 2px solid ${theme.primary};
      border-radius: 8px;
      background-color: ${theme.white};
      color: ${theme.black};

      &:focus + label,
      &:not(:placeholder-shown) + label {
        position: absolute;
        inset: 0 auto auto 8px;
        padding: 0 2px;
        border-radius: 2px;
        translate: 0 -50%;

        font-size: 0.9rem;
      }

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
      position: absolute;
      inset: 50% auto auto 8px;
      background-color: ${theme.white};
      color: ${theme.gray4};
      translate: 0 -50%;

      font-size: 1.25rem;
    }
  `}
`;

export const OptionsContainer = styled.div<{
  $optionsPosition: "top" | "bottom";
}>`
  ${({ theme, $optionsPosition }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.9rem;
    max-height: 300px;
    padding: 8px;
    border: 2px solid ${theme.primary};
    border-radius: 8px;
    background-color: ${theme.white};
    box-shadow: ${theme.boxShadow};
    overflow: auto;
    animation: ${showComboboxOptions} 0.2s linear;
    z-index: -1;

    ${$optionsPosition === "top"
      ? css`
          inset: auto 0 calc(100% - 1rem);
        `
      : css`
          inset: 100% 0 auto;
        `}

    & > button {
      padding: 4px 8px;
      color: ${theme.black};

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
        background-color: ${theme.gray1};
      }
    }
  `}
`;
