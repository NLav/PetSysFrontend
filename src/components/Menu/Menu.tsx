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

        {!collapseMenu ? "Meu Pet" : null}
      </div>

      <div
        className={`menu__navigation-list ${collapseMenu && "menu__navigation-list--collapsed"}`}
      >
        <Link to="/pets">
          <Dog size={32} />
          {!collapseMenu ? "Pets" : null}
        </Link>

        <Link to="/owners">
          <Users size={32} />
          {!collapseMenu ? "Tutores" : null}
        </Link>

        <Link to="/employees">
          <UsersFour size={32} />
          {!collapseMenu ? "Funcionários" : null}
        </Link>
      </div>
    </div>
  );
};

export { Menu };
