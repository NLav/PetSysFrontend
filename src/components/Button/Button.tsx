import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "success" | "danger" | "ghost";
}

const Button = ({ variant, children, ...rest }: IButtonProps) => {
  return (
    <button className={`button button--${variant}`} {...rest}>
      {children}
    </button>
  );
};

export { Button };
