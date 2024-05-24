import styled, { css, keyframes } from "styled-components";

const showModal = keyframes`
  from {
    translate: -10px 0;
  }

  to {
    translate: 0;
  }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: auto auto 16px calc(100% + 16px);
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    padding: 16px;
    border-radius: 16px;
    background-color: ${theme.primary};
    box-shadow: ${theme.boxShadow};
    animation: ${showModal} 0.2s linear;
    z-index: 100;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }
  `}
`;

export const CloseButton = styled.button`
  ${() => css`
    position: absolute;
    inset: 8px 8px auto auto;

    &:hover {
      scale: 1.1;
    }
  `}
`;

export const UserProfilePicture = styled.img`
  ${({ theme }) => css`
    height: 128px;
    border: 4px solid ${theme.gray1};
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
  `}
`;

export const UserName = styled.h1`
  ${() => css`
    text-align: center;

    font-size: 2rem;
  `}
`;

export const UserEmail = styled.h1`
  ${() => css`
    font-size: 1rem;
  `}
`;
