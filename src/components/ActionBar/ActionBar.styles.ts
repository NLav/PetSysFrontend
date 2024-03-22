import styled, { css, keyframes } from "styled-components";

const showButton = keyframes`
  from {
    height: 0;
  }

  to {
  height: 32px;
  }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: start;
    width: 100%;
    padding: 2rem 16px;
    border-radius: 16px;
    background-color: ${theme.secondary};
  `}
`;

export const CollapseButton = styled.button<{ $collapseBar: boolean }>`
  ${({ theme, $collapseBar }) => css`
    position: absolute;
    inset: 16px 16px auto auto;
    color: ${theme.white};
    z-index: 2;

    ${$collapseBar && "rotate: 180deg"}
  `}
`;

export const Title = styled.span<{ $collapseBar: boolean }>`
  ${({ theme, $collapseBar }) => css`
    position: absolute;
    color: ${theme.white};
    z-index: 1;

    font-size: 2rem;
    font-weight: bold;

    ${$collapseBar
      ? css`
          inset: 16px auto auto 16px;
        `
      : css`
          inset: 16px auto auto 50%;
          transform: translateX(-50%);
        `}
  `}
`;

export const ChildrenContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-template-rows: 1fr;
    gap: 16px;
    width: 100%;
    margin-top: 2rem;

    & * {
      color: ${theme.white};

      font-size: 1.1rem;
    }

    & > button {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 4px 8px;
      border: 2px solid ${theme.white};
      border-radius: 8px;
      animation: ${showButton} 0.2s linear;

      &:hover {
        scale: 1.05;
        background-color: ${theme.secondaryDark};
      }
    }
  `}
`;
