import { ButtonHTMLAttributes } from "react";
import * as S from "./Button.styles";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "success" | "danger" | "ghost";
}

const Button = ({ variant, children, ...rest }: IButtonProps) => {
  return (
    <S.Button {...rest} variant={variant}>
      {children}
    </S.Button>
  );
};

export { Button };
