import { X } from "@phosphor-icons/react";
import "./PetsModalFilter.scss";

interface IPetsModalFilterProps {
  setShowModal: React.Dispatch<
    React.SetStateAction<"search-modal" | "order-modal" | "filter-modal" | null>
  >;
}

const PetsModalFilter = ({ setShowModal }: IPetsModalFilterProps) => {
  return (
    <div className="pets-modal-filter">
      <div className="pets-modal-filter__header">
        Filtros
        <button>
          <X size={16} onClick={() => setShowModal(null)} />
        </button>
      </div>

      <div className="pets-modal-filter__content">
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>

      <div className="pets-modal-filter__footer">
        <button>Limpar Filtros</button>

        <button>Filtrar</button>
      </div>
    </div>
  );
};

export { PetsModalFilter };
