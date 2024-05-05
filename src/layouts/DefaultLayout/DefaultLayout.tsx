import { Dog, User, UsersFour } from "@phosphor-icons/react";
import { Menu } from "components";
import { IMenuOption } from "components/Menu";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LocalStorageService } from "services";
import * as S from "./DefaultLayout.styles";

const DefaultLayout = () => {
  const navigate = useNavigate();

  const menuOptions: IMenuOption[] = [
    {
      label: "Pets",
      href: "/pets",
      icon: <Dog />,
    },
    {
      label: "Tutores",
      href: "/pet-owners",
      icon: <User />,
    },
    {
      label: "Funcionários",
      href: "/users",
      icon: <UsersFour />,
    },
  ];

  useEffect(() => {
    if (!LocalStorageService.getLoginInformation()) {
      navigate("/login");
    } else if (window.location.pathname === "/") {
      navigate("/pets");
    }
  }, [navigate]);

  return (
    <S.Container>
      <Menu menuOptions={menuOptions} />

      <S.ContentContainer>
        <Outlet />
      </S.ContentContainer>
    </S.Container>
  );
};

export { DefaultLayout };
