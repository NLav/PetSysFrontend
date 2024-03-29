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
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-template-rows: max-content;
    gap: 24px;
    height: 100%;
    padding: 16px;
    border-radius: 16px;
    background-color: ${theme.secondary};
    overflow: auto;
  `}
`;
