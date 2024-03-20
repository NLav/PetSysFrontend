import styled, { css } from "styled-components";
import { IButtonProps } from "./Button";

export const Button = styled.button<IButtonProps>`
  ${({ variant }) => css`
    width: 100%;
    border-radius: 16px;
    padding: 4px 8px;

    font-size: 1.25rem;

    &:hover {
      scale: 1.05;
    }

    ${variant === "primary" &&
    css`
      color: var(--white);
      background-color: var(--primary);

      &:hover {
        background-color: var(--primaryDark);
      }
    `}

    ${variant === "secondary" &&
    css`
      color: var(--white);
      background-color: var(--secondary);

      &:hover {
        background-color: var(--secondaryDark);
      }
    `}

  ${variant === "success" &&
    css`
      color: var(--white);
      background-color: var(--success);

      &:hover {
        background-color: var(--successDark);
      }
    `}

  ${variant === "danger" &&
    css`
      color: var(--white);
      background-color: var(--error);

      &:hover {
        background-color: var(--errorDark);
      }
    `}

    ${variant === "ghost" &&
    css`
      color: var(--black);
      color: var(--primaryDark);
      border: 2px solid var(--primaryDark);

      &:hover {
        color: var(--primaryDark);
        border-color: var(--primaryDark);
      }
    `}
  `}
`;
