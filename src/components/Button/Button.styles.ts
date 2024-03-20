import styled, { css } from "styled-components";
import { IButtonProps } from "./Button";

export const Button = styled.button<IButtonProps>`
  ${({ theme, variant }) => css`
    width: 100%;
    border-radius: 16px;
    padding: 4px 8px;

    font-size: 1.25rem;

    &:hover {
      scale: 1.05;
    }

    ${variant === "primary" &&
    css`
      color: ${theme.white};
      background-color: ${theme.primary};

      &:hover {
        background-color: ${theme.primaryDark};
      }
    `}

    ${variant === "secondary" &&
    css`
      color: ${theme.white};
      background-color: ${theme.secondary};

      &:hover {
        background-color: ${theme.secondaryDark};
      }
    `}

  ${variant === "success" &&
    css`
      color: ${theme.white};
      background-color: ${theme.success};

      &:hover {
        background-color: ${theme.successDark};
      }
    `}

  ${variant === "danger" &&
    css`
      color: ${theme.white};
      background-color: ${theme.error};

      &:hover {
        background-color: ${theme.errorDark};
      }
    `}

    ${variant === "ghost" &&
    css`
      color: ${theme.black};
      color: ${theme.primaryDark};
      border: 2px solid ${theme.primaryDark};

      &:hover {
        color: ${theme.primaryDark};
        border-color: ${theme.primaryDark};
      }
    `}
  `}
`;
