import styled, { css } from "styled-components";

export const Container = styled.form`
  ${() => css`
    display: flex;
    flex-direction: column;
  `}
`;

export const InputsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 2px solid ${theme.gray2};
  `}
`;

export const ButtonsContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 8px;
  `}
`;
