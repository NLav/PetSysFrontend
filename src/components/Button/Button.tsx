import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...rest }: IButtonProps) => {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  );
};

export { Button };
