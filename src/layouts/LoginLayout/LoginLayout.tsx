import { ToggleDarkMode } from "components";
import { Outlet } from "react-router-dom";
import * as S from "./LoginLayout.styles";

const LoginLayout = () => {
  return (
    <S.Container>
      <S.ContentContainer>
        <S.ToggleContainer>
          <ToggleDarkMode />
        </S.ToggleContainer>

        <Outlet />
      </S.ContentContainer>
    </S.Container>
  );
};

export { LoginLayout };
