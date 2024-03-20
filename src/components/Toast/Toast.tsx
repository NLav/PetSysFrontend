import { Check, Warning, X } from "@phosphor-icons/react";
import { ToastContext } from "contexts";
import { useContext, useEffect } from "react";
import * as S from "./Toast.styles";

const Toast = () => {
  const { toast, setToast } = useContext(ToastContext);

  useEffect(() => {
    setTimeout(() => {
      setToast({ variant: "success", title: "", description: "" });
    }, 4000);
  }, [toast, setToast]);

  if (toast.title === "") {
    return;
  }

  return (
    <S.Container $variant={toast.variant}>
      <S.CloseButton
        onClick={() =>
          setToast({ variant: "success", title: "", description: "" })
        }
      >
        <X size={24} />
      </S.CloseButton>

      {toast.variant === "success" ? (
        <Check size={32} />
      ) : (
        <Warning size={32} />
      )}

      <S.TextContainer>
        <S.Title>{toast.title}</S.Title>

        <S.Description>{toast.description}</S.Description>
      </S.TextContainer>

      <S.CountdownBar></S.CountdownBar>
    </S.Container>
  );
};

export { Toast };
