import { Modal } from "components";
import { IPetDTO } from "services/dtos";
import "./CardPetModalEdit.scss";

interface ICardPetModalEditProps extends IPetDTO {
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardPetModalEdit = ({
  id,
  name,
  image_url,
  birth_date,
  breed,
  setShowModalEdit,
}: ICardPetModalEditProps) => {
  return (
    <Modal title="Editar Pet" closeModal={() => setShowModalEdit(false)}>
      <div className="card-pet-modal-edit">CardPetModalEdit</div>
    </Modal>
  );
};

export { CardPetModalEdit };
