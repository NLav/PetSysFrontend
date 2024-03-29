import styled, { css } from "styled-components";

export const Container = styled.button`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas:
      "name pets"
      "address address";
    grid-template-columns: repeat(2, 50%);
    gap: 16px 0;
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
  ${() => css`
    grid-area: name;
  `}
`;

export const AddressContainer = styled(InformationContainer)`
  ${() => css`
    grid-area: address;
  `}
`;

export const PetsContainer = styled(InformationContainer)`
  ${() => css`
    grid-area: pets;
  `}
`;
