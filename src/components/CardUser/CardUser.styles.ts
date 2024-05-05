import styled, { css } from "styled-components";

export const Container = styled.button`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 16px 0;
    justify-content: space-between;
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

export const InformationContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;

    & > span {
      &:nth-child(1) {
        color: ${theme.gray4};

        font-size: 0.8rem;
      }

      &:nth-child(2) {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${theme.black};
        text-align: start;

        font-size: 1.2rem;
      }
    }
  `}
`;

export const NameContainer = styled(InformationContainer)`
  ${() => css``}
`;

export const EmailContainer = styled(InformationContainer)`
  ${() => css``}
`;
