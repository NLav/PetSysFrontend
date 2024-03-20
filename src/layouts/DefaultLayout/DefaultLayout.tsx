import { Menu, Toast } from "components";
import { ToastContext } from "contexts";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "stores/hooks";
import * as S from "./DefaultLayout.styles";

const DefaultLayout = () => {
  const { toast, setToast } = useContext(ToastContext);

  const { error: petsError } = useAppSelector((state) => state.pets);

  useEffect(() => {
    petsError.petsPaginated &&
      setToast({
        variant: "danger",
        title: petsError.petsPaginated?.statusCode || "Erro na listagem",
        description: petsError.petsPaginated?.message || "Erro ao listar Pets",
      });
  }, [petsError, setToast]);

  return (
    <S.Container>
      <S.MenuContainer>
        <Menu />
      </S.MenuContainer>

      <S.ContentContainer>
        <Outlet />
      </S.ContentContainer>

      {toast.title !== "" && <Toast />}
    </S.Container>
  );
};

export { DefaultLayout };
