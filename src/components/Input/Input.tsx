import { Asterisk } from "@phosphor-icons/react";
import { InputHTMLAttributes } from "react";
import * as S from "./Input.styles";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
  errorMessage?: string;
}

const Input = ({ errorMessage, id, title, required, ...rest }: IInputProps) => {
  return (
    <S.Container className="input">
      <S.InputsContainer className="input__input-container">
        <input {...rest} id={id} placeholder=" "></input>

        <S.Title htmlFor={id} className="input__input-container__title">
          {title} {required && <Asterisk size={12} color="var(--error)" />}
        </S.Title>
      </S.InputsContainer>

      <S.ErrorMessage className="input__error-message">
        {errorMessage}
      </S.ErrorMessage>
    </S.Container>
  );
};

export { Input };
