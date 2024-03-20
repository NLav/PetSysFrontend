import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-radius: 16px;
    background-color: var(--secondary);
  `}
`;

export const Title = styled.span`
  ${() => css`
    font-size: 2rem;
    font-weight: bold;
    color: var(--white);
  `}
`;

export const ChildrenContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 16px;

    & * {
      color: var(--white);

      font-size: 1rem;
    }

    & > button {
      display: flex;
      gap: 4px;
      align-items: center;
      border: 2px solid var(--white);
      border-radius: 8px;
      padding: 4px 8px;

      &:hover {
        scale: 1.05;
        background-color: var(--secondaryDark);
      }
    }
  `}
`;
