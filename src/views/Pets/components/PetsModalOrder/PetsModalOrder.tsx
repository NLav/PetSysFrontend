import { ActionBarModal } from "components";
import { petsModals } from "../../Pets";
import "./PetsModalOrder.scss";

interface IPetsModalOrderProps {
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const PetsModalOrder = ({ setShowModal }: IPetsModalOrderProps) => {
  return (
    <ActionBarModal
      title="Ordenação"
      closeModal={() => setShowModal(null)}
      buttons={[
        {
          label: "Ordenar",
          variant: "primary",
          onClick: () => {
            alert("Ordenar");
          },
        },
      ]}
    >
      <div className="pets-modal-order">
        <span>PetsModalFilter</span>
      </div>
    </ActionBarModal>
  );
};

export { PetsModalOrder };
