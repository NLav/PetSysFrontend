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

      <span className="card-pet__name">{name}</span>

      <span className="card-pet__age">
        {format(birthDate || new Date(2020, 3, 1), "dd/MM/yyyy")}
      </span>

      <span className="card-pet__breed">{breed}</span>
    </div>
  );
};

export { CardPet };
