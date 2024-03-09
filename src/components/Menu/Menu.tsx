import { Dog, PawPrint, Users, UsersFour } from "@phosphor-icons/react";
import "./Menu.scss";

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu__logo-container">
        <PawPrint size={120} />

        <span>Meu Pet</span>
      </div>

      <div className="menu__navigation-list">
        <button>
          <Dog size={24} />
          Pets
        </button>

        <button>
          <Users size={32} />
          Tutores
        </button>

        <button>
          <UsersFour size={32} />
          Funcionários
        </button>
      </div>
    </div>
  );
};

export { Menu };
