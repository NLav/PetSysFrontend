import styled, { css } from "styled-components";
import { IToggleProps } from "./Toggle";

export const Container = styled.div`
  ${() => css`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  `}
`;

export const Input = styled.input`
  ${() => css`
    display: none;
  `}
`;

export const Toggle = styled.label<{
  $width: IToggleProps["width"];
  $height: IToggleProps["height"];
}>`
  ${({ theme, defaultChecked, $width, $height }) => css`
    position: relative;
    width: ${$width}px;
    height: ${$height}px;
    border-radius: 16px;
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
