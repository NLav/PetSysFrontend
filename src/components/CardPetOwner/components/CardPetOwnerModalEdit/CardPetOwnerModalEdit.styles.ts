import styled, { css } from "styled-components";

export const Container = styled.form`
  ${() => css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `}
`;

export const InputsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 2px solid ${theme.gray2};
  `}
`;

export const PetsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    max-height: 200px;
  `}
`;

export const PetsActionBar = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    & > span {
      width: 100%;
    }

    & svg {
      color: ${theme.black};
    }
  `}
`;

export const PetsCard = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 80px 1fr 24px;
    gap: 8px;
    align-items: center;
    min-height: 80px;
    padding-right: 16px;
    border: 2px solid ${theme.gray2};
    border-radius: 16px;
    overflow: hidden;

    & > div {
      border-right: 2px solid ${theme.gray2};
      aspect-ratio: 1/1;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & > button {
      color: ${theme.error};

      &:hover {
        scale: 1.25;
      }
    }
  `}
`;

export const NoImageContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 8px;
    text-align: center;

    font-size: 0.8rem;
  `}
`;

export const ButtonsContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 8px;
  `}
`;
