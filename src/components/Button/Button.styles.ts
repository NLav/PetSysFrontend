import styled, { css } from "styled-components";
import { IButtonProps } from "./Button";

export const Button = styled.button<{
  $variant: IButtonProps["variant"];
  $fontSize: string;
}>`
  ${({ theme, $variant, $fontSize }) => css`
    display: flex;
    gap: 8px;
    width: 100%;
    border-radius: 16px;
    padding: 4px 8px;

    font-size: ${$fontSize};

    &:hover {
      scale: 1.05;
    }

    ${$variant === "primary" &&
    css`
      color: ${theme.white};
      background-color: ${theme.primary};

      &:hover {
        background-color: ${theme.primaryDark};
      }
    `}

    ${$variant === "secondary" &&
    css`
      color: ${theme.white};
      background-color: ${theme.secondary};

      &:hover {
        background-color: ${theme.secondaryDark};
      }
    `}

  ${$variant === "success" &&
    css`
      color: ${theme.white};
      background-color: ${theme.success};

      &:hover {
        background-color: ${theme.successDark};
      }
    `}

  ${$variant === "danger" &&
    css`
      color: ${theme.white};
      background-color: ${theme.error};

      &:hover {
        background-color: ${theme.errorDark};
      }
    `}

    ${$variant === "primary-ghost" &&
    css`
      color: ${theme.black};
      color: ${theme.primaryDark};
      border: 2px solid ${theme.primaryDark};

      &:hover {
        color: ${theme.primaryDark};
        border-color: ${theme.primaryDark};
      }
    `}

    ${$variant === "secondary-ghost" &&
    css`
      color: ${theme.black};
      color: ${theme.secondaryDark};
      border: 2px solid ${theme.secondaryDark};

      &:hover {
        color: ${theme.secondaryDark};
        border-color: ${theme.secondaryDark};
      }
    `}

    ${$variant === "white-ghost" &&
    css`
      color: ${theme.black};
      color: ${theme.white};
      border: 2px solid ${theme.white};

      &:hover {
        color: ${theme.white};
        border-color: ${theme.white};
      }
    `}
  `}
`;
