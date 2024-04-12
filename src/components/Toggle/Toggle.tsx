import React, { InputHTMLAttributes } from "react";
import * as S from "./Toggle.styles";

export interface IToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSideSibling?: React.ReactNode;
  rightSideSibling?: React.ReactNode;
  insideLeftIcon?: React.ReactNode;
  insideRightIcon?: React.ReactNode;
  width?: number;
  height?: number;
}

const Toggle = ({
  leftSideSibling,
  rightSideSibling,
  insideLeftIcon,
  insideRightIcon,
  width = 64,
  height = 32,
  id,
  defaultChecked,
  ...rest
}: IToggleProps) => {
  return (
    <S.Container>
      {leftSideSibling}

      <S.Input
        {...rest}
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
      />
      <S.Toggle
        htmlFor={id}
        $width={width}
        $height={height}
        defaultChecked={defaultChecked}
      >
        {insideLeftIcon}
        <div></div>
        {insideRightIcon}
      </S.Toggle>

      {rightSideSibling}
    </S.Container>
  );
};

export { Toggle };
