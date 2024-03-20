import {
  CaretDoubleLeft,
  Dog,
  Moon,
  PawPrint,
  Sun,
  Users,
  UsersFour,
} from "@phosphor-icons/react";
import { Toggle } from "components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";
import * as S from "./Menu.styles";
import { MenuTooltip } from "./components";

const Menu = () => {
  const [collapseMenu, setCollapseMenu] = useState(false);

  const { isDarkMode, set } = useDarkMode();

  return (
    <S.Container collapseMenu={collapseMenu}>
      <S.CollapseButton onClick={() => setCollapseMenu(!collapseMenu)}>
        <CaretDoubleLeft
          size={16}
          weight="bold"
          style={{ rotate: collapseMenu ? "180deg" : "0deg" }}
        />
      </S.CollapseButton>

      <S.LogoContainer>
        <PawPrint size={collapseMenu ? 64 : 136} />

        {!collapseMenu ? "PetSys" : null}
      </S.LogoContainer>

      <S.NavigationList collapseMenu={collapseMenu}>
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
        <Toggle
          id="dark-mode-toggle"
          leftSideSibling={!collapseMenu && <Sun size={32} />}
          rightSideSibling={!collapseMenu && <Moon size={32} />}
          defaultChecked={isDarkMode}
          onChange={(event) => set(event.target.checked)}
        />
      </S.ToggleContainer>
    </S.Container>
  );
};

export { Menu };
