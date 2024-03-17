import { CardImage } from "components/CardImage";
import { format } from "date-fns";
import { useState } from "react";
import { IPetDTO } from "services/dtos";
import "./CardPet.scss";
import { CardPetModalEdit } from "./components";

interface ICardPetProps extends IPetDTO {}

const CardPet = ({ id, name, image_url, birth_date, breed }: ICardPetProps) => {
  const [showModalEdit, setShowModalEdit] = useState(false);

  return (
    <>
      <div
        className="card-pet"
        onClick={(event) => {
          event.stopPropagation();

          setShowModalEdit(true);
        }}
      >
        <span className="card-pet__image-container">
          <CardImage imageUrl={image_url} alt={`${name}-picture`} />
        </span>

        <div className="card-pet__information-container card-pet__name-container">
          <span>Nome:</span>

          <span className="card-pet__name-container__name" data-tooltip="name">
            {name}
          </span>
        </div>

        <span className="card-pet__information-container card-pet__age-container">
          <span>Data de nascimento:</span>

          <span className="card-pet__age-container__age">
            {format(birth_date, "dd/MM/yyyy")}
          </span>
        </span>

        <span className="card-pet__information-container card-pet__breed-container">
          <span>Raça:</span>

          <span className="card-pet__breed-container__breed">{breed}</span>
        </span>
      </div>

      {showModalEdit && (
        <CardPetModalEdit
          id={id}
          name={name}
          image_url={image_url}
          birth_date={birth_date}
          breed={breed}
          setShowModalEdit={setShowModalEdit}
        />
      )}
    </>
  );
};

export { CardPet };
