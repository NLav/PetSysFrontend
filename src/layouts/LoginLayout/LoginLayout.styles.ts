import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    background-color: ${theme.white};
    background-image: url(https://i.pinimg.com/originals/d4/80/c4/d480c40dcb2d74ab9d31d96e8dc3cad1.png);
    background-repeat: repeat-x;
    background-size: cover;
  `}
`;

export const ContentContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 50vw;
    height: 100vh;
    background-color: ${theme.primary};
  `}
`;

export const ToggleContainer = styled.div`
  ${() => css`
    position: absolute;
    inset: 16px 16px auto auto;
  `}
`;
