import React, { InputHTMLAttributes } from "react";
import * as S from "./Toggle.styles";

export interface IToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSideSibling?: React.ReactNode;
  rightSideSibling?: React.ReactNode;
  width?: number;
  height?: number;
}

const Toggle = ({
  leftSideSibling,
  rightSideSibling,
  width = 64,
  height = 32,
  id,
  defaultChecked,
  ...rest
}: IToggleProps) => {
  return (
    <S.Container>
      {leftSideSibling && leftSideSibling}

      <S.Input {...rest} id={id} type="checkbox" />
      <S.Toggle
        htmlFor={id}
        $width={width}
        $height={height}
        defaultChecked={defaultChecked}
      >
        <div></div>
      </S.Toggle>

      {rightSideSibling && rightSideSibling}
    </S.Container>
  );
};

export { Toggle };
