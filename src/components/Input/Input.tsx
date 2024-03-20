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
    <S.Container>
      <S.InputsContainer>
        <input {...rest} id={id} placeholder=" "></input>

        <S.Title htmlFor={id}>
          {title} {required && <Asterisk size={12} />}
        </S.Title>
      </S.InputsContainer>

      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
    </S.Container>
  );
};

export { Input };
