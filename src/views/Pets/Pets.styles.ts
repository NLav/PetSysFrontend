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
    grid-auto-rows: max-content;
    gap: 24px 0;
    justify-content: space-between;
    height: 100%;
    padding: 16px;
    border-radius: 16px;
    background-color: ${theme.secondary};
    overflow: auto;
  `}
`;
