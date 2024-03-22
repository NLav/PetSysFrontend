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
    width: 100%;
    padding: 0 136px;

    @media (max-width: 500px) {
      grid-template-columns: repeat(3, min-content);
      gap: 8px;
      padding: 0;
    }
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
  ${({ theme }) => css`
    color: ${theme.black};

    &:disabled {
      color: ${theme.gray2};
    }

    &:hover {
      &:not(:disabled) {
        scale: 1.25;
      }
    }
  `}
`;

export const PathContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    & > span,
    & > form > input {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border: 4px solid;
      border-radius: 4px;
      color: ${theme.black};
    }

    & > svg {
      color: ${theme.black};
    }

    @media (max-width: 500px) {
      gap: 4px;
    }
  `}
`;

export const NumberAround = styled.span<{ $visible: boolean }>`
  ${({ theme, $visible }) => css`
    border-color: ${theme.secondary} !important;
    user-select: none;
    cursor: pointer;

    ${!$visible &&
    css`
      visibility: hidden;
    `}

    &:hover {
      scale: 1.15;
    }
  `}
`;

export const RestPageInput = styled.input`
  ${({ theme }) => css`
    border-color: ${theme.primary} !important;
    background-color: transparent;

    scale: 1.15;
    text-align: center;

    font-size: 1rem;
  `}
`;
