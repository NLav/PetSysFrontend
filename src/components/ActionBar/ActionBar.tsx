import { CaretDown } from "@phosphor-icons/react";
import React, { useState } from "react";
import * as S from "./ActionBar.styles";

interface IActionBarProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

const ActionBar = ({ title, children }: IActionBarProps) => {
  const [collapseBar, setCollapseBar] = useState(true);
  return (
    <S.Container>
      <S.CollapseButton
        $collapseBar={collapseBar}
        onClick={() => setCollapseBar((current) => !current)}
      >
        <CaretDown size={24} />
      </S.CollapseButton>

      <S.Title $collapseBar={collapseBar}>{title}</S.Title>

      {!collapseBar && <S.ChildrenContainer>{children}</S.ChildrenContainer>}
    </S.Container>
  );
};

export { ActionBar };
