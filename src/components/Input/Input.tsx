import { Asterisk, Eye, EyeClosed } from "@phosphor-icons/react";
import { InputHTMLAttributes, useState } from "react";
import * as S from "./Input.styles";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
  errorMessage?: string;
}

const Input = ({
  errorMessage,
  id,
  title,
  required,
  type,
  ...rest
}: IInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <S.Container>
      <S.InputsContainer>
        <input
          {...rest}
          id={id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder=" "
        ></input>

        <S.Title htmlFor={id}>
          {title} {required && <Asterisk size={12} />}
        </S.Title>

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <Eye size={24} /> : <EyeClosed size={24} />}
          </button>
        )}
      </S.InputsContainer>

      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
    </S.Container>
  );
};

export { Input };
