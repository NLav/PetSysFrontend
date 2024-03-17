import { CardImage } from "components/CardImage";
import { format } from "date-fns";
import "./CardPet.scss";

interface ICardPetProps {
  name: string;
  imageUrl?: string;
  birthDate?: Date;
  breed?: string;
}

const CardPet = ({ name, imageUrl, birthDate, breed }: ICardPetProps) => {
  return (
    <div className="card-pet">
      <span className="card-pet__image-container">
        <CardImage imageUrl={imageUrl} alt={`${name}-picture`} />
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
          {format(birthDate || new Date(2020, 3, 1), "dd/MM/yyyy")}
        </span>
      </span>

      <span className="card-pet__information-container card-pet__breed-container">
        <span>Raça:</span>

        <span className="card-pet__breed-container__breed">{breed}</span>
      </span>
    </div>
  );
};

export { CardPet };
