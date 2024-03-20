import React from "react";
import * as S from "./ActionBar.styles";

interface IActionBarProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

const ActionBar = ({ title, children }: IActionBarProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      {children && <S.ChildrenContainer>{children}</S.ChildrenContainer>}
    </S.Container>
  );
};

export { ActionBar };
