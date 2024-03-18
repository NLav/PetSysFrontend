import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "success" | "danger" | "ghost";
}

const Button = ({ variant, children, ...rest }: IButtonProps) => {
  return (
    <button {...rest} className={`button button--${variant}`}>
      {children}
    </button>
  );
};

export { Button };
