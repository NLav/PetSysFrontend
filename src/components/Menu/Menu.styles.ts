import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const MobileContainer = styled.div<{ $openMenu: boolean }>`
  ${({ theme, $openMenu }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 64px;
    width: 400px;
    padding: 32px 0;
    background-color: ${theme.primary};
    color: ${theme.white};
    border-radius: 0 32px 32px 0;
    box-shadow: ${theme.boxShadow} inset;
    z-index: 2;

    ${!$openMenu &&
    css`
      width: 0;
      translate: -100% 0;

      & > ${MobileNavigationList} {
        & > a {
          display: none;
        }
      }
    `}
  `}
`;

export const MobileCollapseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    inset: 0 auto auto 100%;
    color: ${theme.primary};
  `}
`;

export const MobileNavigationList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border: solid ${theme.white};
    border-width: 4px 0;

    & > a {
      display: flex;
      gap: 16px;
      align-items: center;
      width: 100%;
      padding: 4px 8px;
      color: ${theme.white};

      font-size: 1.5rem;
      text-decoration: none;

      &:not(:last-child) {
        border-bottom: 4px solid ${theme.white};
      }

      & > svg {
        width: 64px;
        height: 64px;
      }
    }
  `}
`;

export const DesktopContainer = styled.div<{
  $collapseMenu: boolean;
}>`
  ${({ theme, $collapseMenu }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 64px;
    height: 100%;
    padding: 32px;
    border-radius: 0 32px 32px 0;
    background-color: ${theme.primary};
    box-shadow: 8px 0 16px rgba(0, 0, 0, 0.5);
    color: ${theme.white};

    ${$collapseMenu &&
    css`
      padding: 32px 8px;
    `}
  `}
`;

export const DesktopCollapseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    inset: 0 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    border-radius: 0 32px 32px 0;
    transform: translateX(2px);
    color: ${theme.white};
    z-index: 10;

    & > svg {
      transition: 0s;
    }

    &:hover {
      box-shadow: 0 0 16px white;
      background-color: #ffffff88;
      backdrop-filter: blur(2px);
      color: ${theme.black};
    }
  `}
`;

export const UserContainer = styled.button<{
  $collapseMenu: boolean;
}>`
  ${({ theme, $collapseMenu }) => css`
    position: absolute;
    inset: auto 0 0;
    display: flex;
    gap: 8px;
    justify-content: ${$collapseMenu ? "center" : "start"};
    align-items: center;
    height: 64px;
    padding: 8px;
    border-radius: 0 0 32px 0;
    background-color: ${theme.secondary};
    color: ${theme.white};

    font-size: 1.25rem;
    font-weight: bold;

    &:hover {
      background-color: ${theme.secondaryDark};
    }

    & > span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: start;
    }
  `}
`;

export const UserProfilePicture = styled.img`
  ${({ theme }) => css`
    height: 100%;
    border: 4px solid ${theme.gray1};
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
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

export const DesktopNavigationList = styled.div<{
  $collapseMenu: boolean;
}>`
  ${({ $collapseMenu }) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;

    ${$collapseMenu &&
    css`
      align-items: center;
    `}
  `}
`;

export const DesktopStyledLink = styled(Link)<{ $selected: boolean }>`
  ${({ theme, $selected }) => css`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 100%;
    padding: 4px 8px;
    border-radius: 8px;
    color: ${theme.white};

    font-size: 1rem;
    text-decoration: none;

    ${$selected
      ? css`
          background-color: ${theme.primaryDark};
          transform: translateX(10px);
        `
      : css`
          &:hover {
            background-color: ${theme.primaryDark};
            transform: translateX(10px);
          }
        `}

    & > svg {
      width: 32px;
      height: 32px;
    }
  `}
`;

export const ToggleContainer = styled.div`
  ${() => css`
    margin-top: auto;
    margin-bottom: 64px;
    z-index: 0;
  `}
`;
