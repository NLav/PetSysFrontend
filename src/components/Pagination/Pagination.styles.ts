import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    position: relative;
    display: flex;
    align-items: center;
  `}
`;

export const ComboboxContainer = styled.div`
  ${() => css`
    min-width: 120px;
    max-width: 120px;
    margin-right: 32px;
  `}
`;

export const PaginationContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > button {
      border-radius: 8px;
    }
  `}
`;

export const PaginationPathContainer = styled.div`
  ${() => css`
    display: flex;
    margin: 0 auto;
    width: fit-content;
  `}
`;

export const PaginationPath = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    min-width: 40px;
    height: 40px;
    overflow: hidden;
  `}
`;

export const PaginationPathBefore = styled(PaginationPath)`
  ${() => css`
    flex-direction: row-reverse;
  `}
`;

export const PaginationPathAfter = styled(PaginationPath)`
  ${() => css``}
`;

export const PaginationChild = styled.button`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    height: 40px;
    border: 2px solid ${theme.primary};
    color: ${theme.black};

    font-size: 1.25rem;
  `}
`;

export const RestPageContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    width: 40px;
    min-width: 40px;
    height: 40px;
    background-color: ${theme.primary};
    color: ${theme.white};
    border: 2px solid ${theme.primary};
  `}
`;

export const RestPageInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    color: ${theme.white};
    text-align: center;

    font-size: 1.25rem;
  `}
`;
