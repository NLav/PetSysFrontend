import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-areas: "menu-container content-container";
    grid-template-columns: max-content 1fr;
    grid-template-rows: 100vh;
    overflow: hidden;
  `}
`;

export const MenuContainer = styled.div`
  ${() => css`
    grid-area: menu-container;
  `}
`;

export const ContentContainer = styled.div`
  ${() => css`
    grid-area: content-container;
    height: 100%;
    padding: 40px;
  `}
`;
