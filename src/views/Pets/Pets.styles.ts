import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;
  `}
`;

export const ListingContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 32%);
    grid-template-rows: max-content;
    gap: 24px 0;
    justify-content: space-between;
    height: 100%;
    padding: 16px;
    border-radius: 16px;
    background-color: ${theme.secondary};
    overflow: auto;

    @media (min-width: 1280px) {
      grid-template-columns: repeat(4, 24%);
    }

    @media (min-width: 1600px) {
      grid-template-columns: repeat(5, 19%);
    }
  `}
`;

export const NoPetsContainer = styled.span`
  ${({ theme }) => css`
    position: absolute;
    inset: 50% 50% auto auto;
    transform: translate(50%, -50%);
    color: ${theme.white};

    font-size: 2rem;
  `}
`;
