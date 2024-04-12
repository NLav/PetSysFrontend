import { useState } from "react";
import * as S from "./MenuTooltip.styles";

interface IPopoverProps {
  text: string;
  children: React.ReactElement;
}

const MenuTooltip = ({ text, children }: IPopoverProps) => {
  const [showText, setShowText] = useState(false);

  return (
    <S.Container
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      {children}

      {showText ? <S.Text>{text}</S.Text> : null}
    </S.Container>
  );
};

export { MenuTooltip };
