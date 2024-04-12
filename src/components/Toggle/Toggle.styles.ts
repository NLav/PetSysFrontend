import styled, { css } from "styled-components";
import { IToggleProps } from "./Toggle";

export const Container = styled.div`
  ${() => css`
    position: relative;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    position: absolute;
    width: 0;
    height: 0;

    &:focus {
      & ~ ${Toggle} {
        outline: 2px solid ${theme.black};
      }
    }
  `}
`;

export const Toggle = styled.label<{
  $width: IToggleProps["width"];
  $height: IToggleProps["height"];
}>`
  ${({ theme, defaultChecked, $width, $height }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${$width}px;
    height: ${$height}px;
    padding: 0 4px;
    border-radius: 16px;
    color: ${theme.black};
    background-color: ${theme.white};
    cursor: pointer;

    & > div {
      position: absolute;
      inset: ${defaultChecked ? "4px 4px 4px 50%" : "4px 50% 4px 4px"};
      border-radius: 16px;
      background-color: ${theme.primary};
    }
  `}
`;
