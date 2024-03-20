import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border-radius: 16px;
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    cursor: pointer;

    &:hover {
      scale: 1.05;
    }
  `}
`;

export const NoImageContainer = styled.div`
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
  ${() => css`
    display: flex;
    flex-direction: column;

    & > span {
      &:nth-child(1) {
        color: var(--gray4);

        font-size: 0.8rem;
      }

      &:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;

        font-size: 1.2rem;
      }
    }
  `}
`;
