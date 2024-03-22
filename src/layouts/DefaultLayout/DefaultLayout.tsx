import { Menu } from "components";
import { Outlet } from "react-router-dom";
import * as S from "./DefaultLayout.styles";

const DefaultLayout = () => {
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
