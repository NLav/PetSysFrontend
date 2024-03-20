import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `}
`;

export const OptionContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 16px;
    align-items: center;

    &:not(:last-child) {
      padding-bottom: 8px;
      border-bottom: 2px solid ${theme.gray1};
    }

    & > span {
      width: 100%;
    }
  `}
`;

export const OrderButton = styled.button<{ $selected: boolean }>`
  ${({ theme, $selected }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${theme.white};
    border-radius: 4px;

    ${$selected &&
    css`
      border-color: ${theme.primary};
    `}
  `}
`;
