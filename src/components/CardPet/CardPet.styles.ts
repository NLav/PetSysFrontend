import styled, { css } from "styled-components";

export const Container = styled.button`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: start;
    justify-content: center;
    padding: 16px;
    border-radius: 16px;
    background-color: ${theme.white};
    box-shadow: ${theme.boxShadow};

    &:hover,
    &:focus {
      scale: 1.05;
    }
  `}
`;

export const ImageContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 1/1;
  `}
`;

export const InformationContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: start;

    & > span {
      &:nth-child(1) {
        color: ${theme.gray4};

        font-size: 0.8rem;
      }

      &:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${theme.black};

        font-size: 1.2rem;
      }
    }
  `}
`;
