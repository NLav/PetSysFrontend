import { ButtonHTMLAttributes } from "react";
import * as S from "./Button.styles";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "primary-ghost"
    | "secondary-ghost"
    | "white-ghost";
  fontSize?: string;
}

const Button = ({
  variant,
  fontSize = "1.25rem",
  children,
  ...rest
}: IButtonProps) => {
  return (
    <S.Button {...rest} $variant={variant} $fontSize={fontSize}>
      {children}
    </S.Button>
  );
};

export { Button };
