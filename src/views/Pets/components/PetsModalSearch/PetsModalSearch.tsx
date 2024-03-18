import { ActionBarModal } from "components";
import { petsModals } from "../../Pets";
import "./PetsModalSearch.scss";

interface IPetsModalSearchProps {
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const PetsModalSearch = ({ setShowModal }: IPetsModalSearchProps) => {
  return (
    <ActionBarModal
      title="Pesquisar"
      closeModal={() => setShowModal(null)}
      buttons={[
        {
          label: "Limpar Pesquisa",
          variant: "ghost",
          onClick: () => {
            alert("Limpar Pesquisa");
          },
        },
        {
          label: "Pesquisar",
          variant: "primary",
          onClick: () => {
            alert("Pesquisar");
          },
        },
      ]}
    >
      <div className="pets-modal-search">
        <span>PetsModalSearch</span>
      </div>
    </ActionBarModal>
  );
};

export { PetsModalSearch };
