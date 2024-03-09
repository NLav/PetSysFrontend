import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { ActionBar } from "components";
import "./Pets.scss";

const Pets = () => {
  return (
    <div className="pets">
      <ActionBar title="Pets">
        <button>
          <MagnifyingGlass size={16} weight="bold" />

          <span>Pesquisa</span>
        </button>

        <button>
          <ArrowsDownUp size={16} weight="bold" />

          <span>Ordenação</span>
        </button>

        <button>
          <FunnelSimple size={16} weight="bold" />

          <span>Filtros</span>
        </button>
      </ActionBar>
    </div>
  );
};

export { Pets };
