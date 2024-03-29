import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 50% 50% auto auto;
    transform: translate(50%, -50%);
    color: ${theme.white};

    font-size: 2rem;
  `}
`;
