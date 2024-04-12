import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 0;
    display: flex;
    background-color: ${theme.white};
    overflow: hidden;
  `}
`;

export const ContentContainer = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
    padding: 40px;
    z-index: 1;

    @media (max-width: 500px) {
      padding: 80px 40px 40px;
    }
  `}
`;
