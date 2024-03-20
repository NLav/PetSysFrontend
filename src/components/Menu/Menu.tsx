import {
  CaretDoubleLeft,
  Dog,
  PawPrint,
  Users,
  UsersFour,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./Menu.styles";
import { MenuTooltip } from "./components";

const Menu = () => {
  const [collapseMenu, setCollapseMenu] = useState(false);

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
        <PawPrint size={collapseMenu ? 64 : 120} />

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
    </S.Container>
  );
};

export { Menu };
