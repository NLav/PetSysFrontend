import { ActionBarModal } from "components";
import { petsModals } from "../../Pets";
import "./PetsModalFilter.scss";

interface IPetsModalFilterProps {
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const PetsModalFilter = ({ setShowModal }: IPetsModalFilterProps) => {
  return (
    <ActionBarModal
      title="Filtros"
      closeModal={() => setShowModal(null)}
      buttons={[
        {
          label: "Limpar Filtros",
          variant: "ghost",
          onClick: () => {
            alert("Limpar Filtros");
          },
        },
        {
          label: "Filtrar",
          variant: "primary",
          onClick: () => {
            alert("Filtrar");
          },
        },
      ]}
    >
      <div className="pets-modal-filter">
        <span>PetsModalFilter</span>
      </div>
    </ActionBarModal>
  );
};

export { PetsModalFilter };
