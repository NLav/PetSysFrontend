import { ActionBarModal } from "components";
import { petsModals } from "../../Pets";
import "./PetsModalAdd.scss";

interface IPetsModalAddProps {
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const PetsModalAdd = ({ setShowModal }: IPetsModalAddProps) => {
  return (
    <ActionBarModal
      title="Adicionar Pet"
      closeModal={() => setShowModal(null)}
      buttons={[
        {
          label: "Adicionar",
          onClick: () => {
            alert("Adicionar");
          },
        },
      ]}
    >
      <div className="pets-modal-add">
        <span>PetsModalAdd</span>
      </div>
    </ActionBarModal>
  );
};

export { PetsModalAdd };
