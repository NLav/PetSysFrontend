import { Asterisk } from "@phosphor-icons/react";
import { InputHTMLAttributes } from "react";
import "./Input.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
  errorMessage?: string;
}

const Input = ({ errorMessage, id, title, required, ...rest }: IInputProps) => {
  return (
    <div className="input">
      <div className="input__input-container">
        <input {...rest} id={id} placeholder=" "></input>

        <label htmlFor={id} className="input__input-container__title">
          {title} {required && <Asterisk size={12} color="var(--error)" />}
        </label>
      </div>

      <span className="input__error-message">{errorMessage}</span>
    </div>
  );
};

export { Input };
