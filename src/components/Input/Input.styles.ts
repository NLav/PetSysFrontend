import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `}
`;

export const InputsContainer = styled.div`
  ${() => css`
    position: relative;
    display: flex;
    width: 100%;

    & > input {
      width: 100%;
      height: 40px;
      padding: 0 8px;
      border: 2px solid var(--primary);
      border-radius: 8px;

      &:disabled {
        background-color: var(--gray1);
        cursor: not-allowed;

        & + label {
          background-color: var(--gray1);
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
  ${() => css`
    position: absolute;
    inset: 50% auto auto 8px;
    display: flex;
    padding: 0 2px;
    transform: translateY(-50%);
    background-color: var(--white);
    color: var(--gray4);
    border-radius: 2px;
    user-select: none;
    cursor: text;

    font-size: 1.25rem;

    & > svg {
      margin-bottom: auto;
    }
  `}
`;

export const ErrorMessage = styled.span`
  ${() => css`
    padding-left: 4px;
    color: var(--error);

    font-size: 0.9rem;
  `}
`;
