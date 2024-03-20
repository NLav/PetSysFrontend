import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content min-content 1fr min-content min-content;
    gap: 32px;
    justify-content: space-between;
    align-items: center;
    padding: 0 136px;
  `}
`;

export const ComboboxContainer = styled.div`
  ${() => css`
    position: absolute;
    inset: auto auto auto 0;
    width: 120px;
  `}
`;

export const CaretButton = styled.button`
  ${() => css`
    &:hover {
      &:not(:disabled) {
        scale: 1.25;
      }
    }
  `}
`;

export const PathContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    & > form > input,
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background-color: var(--secondary);
      color: var(--white);
      user-select: none;
      cursor: pointer;

      &:hover {
        scale: 1.15;
      }
    }

    & > form {
      & > input {
        background-color: var(--primary);
        border: 2px solid var(--secondary);
        scale: 1.15;
        text-align: center;

        font-size: 1rem;
      }
    }
  `}
`;
