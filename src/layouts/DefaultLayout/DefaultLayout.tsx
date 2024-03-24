import { Menu } from "components";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LocalStorageService } from "services";
import * as S from "./DefaultLayout.styles";

const DefaultLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!LocalStorageService.getAccessToken()) {
      navigate("/login");
    } else if (window.location.pathname === "/") {
      navigate("/pets");
    }
  }, [navigate]);

  return (
    <S.Container>
      <Menu />

      <S.ContentContainer>
        <Outlet />
      </S.ContentContainer>
    </S.Container>
  );
};

export { DefaultLayout };
