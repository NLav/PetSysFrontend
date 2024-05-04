import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `}
`;

export const InputsContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    width: 100%;

    & > button {
      position: absolute;
      inset: 0 8px 0 auto;
      color: ${theme.gray4};
    }

    & > input {
      width: 100%;
      height: 40px;
      padding: 0 8px;
      border: 2px solid ${theme.primary};
      border-radius: 8px;
      color: ${theme.black};
      background-color: ${theme.white};

      &::-webkit-calendar-picker-indicator {
        color-scheme: ${theme.white === "#fff" ? "light" : "dark"};
      }

      &:disabled {
        background-color: ${theme.gray1};
        cursor: not-allowed;

        & + label {
          background-color: ${theme.gray1};
          cursor: not-allowed;
        }
      }

      &:focus + label,
      &:not(:placeholder-shown) + label {
        transform: translateY(calc(-50% - 1.25rem));

        font-size: 0.9rem;
      }
    }
  `}
`;

export const Title = styled.label`
  ${({ theme }) => css`
    position: absolute;
    inset: 50% auto auto 8px;
    display: flex;
    padding: 0 2px;
    transform: translateY(-50%);
    background-color: ${theme.white};
    color: ${theme.gray4};
    border-radius: 2px;
    user-select: none;
    cursor: text;

    font-size: 1.25rem;

    & > svg {
      * {
        margin-bottom: auto;
        color: ${theme.error};
      }
    }
  `}
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => css`
    padding-left: 4px;
    color: ${theme.error};

    font-size: 0.9rem;
  `}
`;
