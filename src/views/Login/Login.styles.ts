import styled, { css } from "styled-components";

export const Container = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    margin: 0 auto;
    color: ${theme.white};
  `}
`;

export const LogoContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;

    font-size: 1.5rem;
  `}
`;

export const InputsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    & * {
      font-size: 1.25rem;
    }
  `}
`;

export const ButtonContainer = styled.div`
  ${() => css`
    width: 100%;
  `}
`;
