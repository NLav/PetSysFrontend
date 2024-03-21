import { Check, Warning, X } from "@phosphor-icons/react";
import * as S from "./Toast.styles";

export interface IToastProps {
  id: string;
  variant: "success" | "danger";
  title: string;
  description: string;
  index?: number;
  onClick?: () => void;
}

const Toast = ({
  id,
  variant,
  title,
  description,
  index = 0,
  onClick,
}: IToastProps) => {
  return (
    <S.Container id={id} $index={index} $variant={variant}>
      <S.CloseButton onClick={onClick}>
        <X size={24} />
      </S.CloseButton>

      {variant === "success" ? <Check size={32} /> : <Warning size={32} />}

      <S.TextContainer>
        <S.Title>{title}</S.Title>

        <S.Description>{description}</S.Description>
      </S.TextContainer>

      <S.CountdownBar></S.CountdownBar>
    </S.Container>
  );
};

export { Toast };
