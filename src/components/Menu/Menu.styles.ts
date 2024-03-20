import styled, { css } from "styled-components";

export const Container = styled.div<{
  collapseMenu: boolean;
}>`
  ${({ collapseMenu }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 64px;
    height: 100%;
    padding: 32px;
    border-radius: 0 32px 32px 0;
    background-color: var(--primary);
    box-shadow: 8px 0 16px rgba(0, 0, 0, 0.5);
    color: var(--white);

    ${collapseMenu &&
    css`
      padding: 32px 8px;
    `}
  `}
`;

export const CollapseButton = styled.button`
  ${() => css`
    position: absolute;
    inset: 0 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    border-radius: 0 32px 32px 0;
    transform: translateX(2px);
    color: var(--white);

    & > svg {
      transition: 0s;
    }

    &:hover {
      box-shadow: 0 0 16px white;
      background-color: #ffffff88;
      backdrop-filter: blur(2px);
      color: var(--black);

      & > svg {
        transition: 0s;
      }
    }
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

export const NavigationList = styled.div<{
  collapseMenu: boolean;
}>`
  ${({ collapseMenu }) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;

    & a {
      display: flex;
      gap: 4px;
      align-items: center;
      width: 100%;
      padding: 4px 8px;
      border-radius: 8px;
      color: var(--white);

      font-size: 1rem;
      text-decoration: none;

      &:hover {
        background-color: var(--primaryDark);
        transform: translateX(10px);
      }
    }

    ${collapseMenu &&
    css`
      align-items: center;
    `}
  `}
`;
