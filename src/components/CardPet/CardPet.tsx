import { format } from "date-fns";
import "./CardPet.scss";

interface ICardPetProps {
  imageUrl: string;
  name: string;
  birthDate: Date;
  breed: string;
}

const CardPet = ({ imageUrl, name, birthDate, breed }: ICardPetProps) => {
  return (
    <div className="card-pet">
      <span className="card-pet__image-container">
        <img src={imageUrl} alt={`${name}-picture`} />
      </span>

      <span className="card-pet__name">{name}</span>

      <span className="card-pet__age">{format(birthDate, "dd/MM/yyyy")}</span>

      <span className="card-pet__breed">{breed}</span>
    </div>
  );
};

export { CardPet };
