import { CardImage } from "components";
import { format } from "date-fns";
import { useState } from "react";
import { IPetDTO } from "services/dtos";
import * as S from "./CardPet.styles";
import { CardPetModalEdit } from "./components";

interface ICardPetProps extends IPetDTO {}

const CardPet = ({
  id,
  name,
  image_url,
  birth_date,
  breed,
  pet_owner_id,
}: ICardPetProps) => {
  const [showModalEdit, setShowModalEdit] = useState(false);

  return (
    <>
      <S.Container
        onClick={(event) => {
          event.stopPropagation();

          setShowModalEdit(true);
        }}
      >
        <S.ImageContainer>
          <CardImage imageUrl={image_url} alt={`${name}-picture`} />
        </S.ImageContainer>

        <S.InformationContainer>
          <span>Nome:</span>

          <span>{name}</span>
        </S.InformationContainer>

        <S.InformationContainer>
          <span>Data de nascimento:</span>

          <span>{format(birth_date, "dd/MM/yyyy")}</span>
        </S.InformationContainer>

        <S.InformationContainer>
          <span>Raça:</span>

          <span>{breed}</span>
        </S.InformationContainer>
      </S.Container>

      {showModalEdit && (
        <CardPetModalEdit
          id={id}
          name={name}
          image_url={image_url}
          birth_date={birth_date}
          breed={breed}
          pet_owner_id={pet_owner_id}
          setShowModalEdit={setShowModalEdit}
        />
      )}
    </>
  );
};

export { CardPet };
