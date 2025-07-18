import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
    color: ${theme.black};
    text-align: center;
  `}
`;

export const NoImageContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px solid ${theme.gray2};
    border-radius: 16px;
    color: ${theme.black};

    font-weight: bold;
  `}
`;
