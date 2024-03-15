import {
  CaretDoubleLeft,
  Dog,
  PawPrint,
  Users,
  UsersFour,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";
import { MenuTooltip } from "./components";

const Menu = () => {
  const [collapseMenu, setCollapseMenu] = useState(false);

  return (
    <div className={`menu ${collapseMenu ? "menu--collapsed" : null}`}>
      <button
        className="menu__collapse-button"
        onClick={() => setCollapseMenu(!collapseMenu)}
      >
        <CaretDoubleLeft
          size={16}
          weight="bold"
          style={{ rotate: collapseMenu ? "180deg" : "0deg" }}
        />
      </button>

      <div className="menu__logo-container">
        <PawPrint size={collapseMenu ? 64 : 120} />

        {!collapseMenu ? "PetSys" : null}
      </div>

      <div
        className={`menu__navigation-list ${collapseMenu && "menu__navigation-list--collapsed"}`}
      >
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
      </div>
    </div>
  );
};

export { Menu };
