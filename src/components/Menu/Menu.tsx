import {
  CaretDoubleLeft,
  Dog,
  List,
  PawPrint,
  Users,
  UsersFour,
} from "@phosphor-icons/react";
import { ToggleDarkMode } from "components";
import { CollapseMenuContext } from "contexts";
import { useWindowSize } from "hooks";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./Menu.styles";
import { MenuTooltip } from "./components";

const Menu = () => {
  const { collapseMenu, setCollapseMenu } = useContext(CollapseMenuContext);
  const [openMenu, setOpenMenu] = useState(false);

  const { windowSize } = useWindowSize();

  if (windowSize.width <= 500) {
    return (
      <S.MobileContainer $openMenu={openMenu}>
        <S.MobileCollapseButton
          onClick={() => setOpenMenu((current) => !current)}
        >
          <List size={64} />
        </S.MobileCollapseButton>

        <S.LogoContainer>
          <PawPrint size={136} />
          PetSys
        </S.LogoContainer>

        <S.MobileNavigationList>
          <Link to="/pets">
            <Dog size={64} />
            Pets
          </Link>

          <Link to="/owners">
            <Users size={64} />
            Tutores
          </Link>

          <Link to="/employees">
            <UsersFour size={64} />
            Funcionários
          </Link>
        </S.MobileNavigationList>

        <S.ToggleContainer>
          <ToggleDarkMode />
        </S.ToggleContainer>
      </S.MobileContainer>
    );
  }

  return (
    <S.DesktopContainer $collapseMenu={collapseMenu}>
      <S.DesktopCollapseButton onClick={() => setCollapseMenu(!collapseMenu)}>
        <CaretDoubleLeft
          size={16}
          weight="bold"
          style={{ rotate: collapseMenu ? "180deg" : "0deg" }}
        />
      </S.DesktopCollapseButton>

      <S.LogoContainer>
        <PawPrint size={collapseMenu ? 64 : 136} />

        {!collapseMenu ? "PetSys" : null}
      </S.LogoContainer>

      <S.NavigationList $collapseMenu={collapseMenu}>
        {collapseMenu ? (
          <MenuTooltip text="Pets">
            <Link to="/pets">
              <Dog size={32} />
              {!collapseMenu ? "Pets" : null}
            </Link>
          </MenuTooltip>
        ) : (
          <Link to="/pets">
            <Dog size={32} />
            {!collapseMenu ? "Pets" : null}
          </Link>
        )}

        {collapseMenu ? (
          <MenuTooltip text="Tutores">
            <Link to="/owners">
              <Users size={32} />
              {!collapseMenu ? "Tutores" : null}
            </Link>
          </MenuTooltip>
        ) : (
          <Link to="/owners">
            <Users size={32} />
            {!collapseMenu ? "Tutores" : null}
          </Link>
        )}

        {collapseMenu ? (
          <MenuTooltip text="Funcionários">
            <Link to="/employees">
              <UsersFour size={32} />
              {!collapseMenu ? "Funcionários" : null}
            </Link>
          </MenuTooltip>
        ) : (
          <Link to="/owners">
            <UsersFour size={32} />
            {!collapseMenu ? "Tutores" : null}
          </Link>
        )}
      </S.NavigationList>

      <S.ToggleContainer>
        <ToggleDarkMode showIcons={!collapseMenu} />
      </S.ToggleContainer>
    </S.DesktopContainer>
  );
};

export { Menu };
