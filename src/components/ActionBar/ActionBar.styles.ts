import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-radius: 16px;
    background-color: ${theme.secondary};
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    font-size: 2rem;
    font-weight: bold;
    color: ${theme.white};
  `}
`;

export const ChildrenContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 16px;

    & * {
      color: ${theme.white};

      font-size: 1.1rem;
    }

    & > button {
      display: flex;
      gap: 4px;
      align-items: center;
      border: 2px solid ${theme.white};
      border-radius: 8px;
      padding: 4px 8px;

      &:hover {
        scale: 1.05;
        background-color: ${theme.secondaryDark};
      }
    }
  `}
`;
