import { useState } from "react";
import { IPetOwnerDTO } from "services/dtos";
import * as S from "./CardPetOwner.styles";
import { CardPetOwnerModalEdit } from "./components";

interface ICardPetOwnerProps extends IPetOwnerDTO {}

const CardPetOwner = ({ id, name, address, pets }: ICardPetOwnerProps) => {
  const [showModalEdit, setShowModalEdit] = useState(false);

  return (
    <>
      <S.Container
        onClick={(event) => {
          event.stopPropagation();

          setShowModalEdit(true);
        }}
      >
        <S.NameContainer>
          <span>Nome:</span>
          <span>{name}</span>
        </S.NameContainer>

        <S.AddressContainer>
          <span>Endereço:</span>
          <span>{address}</span>
        </S.AddressContainer>

        <S.PetsContainer>
          <span>Pets:</span>

          <span>
            {pets.length ? pets.map((pet) => pet.name).join(", ") : "-"}
          </span>
        </S.PetsContainer>
      </S.Container>

      {showModalEdit && (
        <CardPetOwnerModalEdit
          id={id}
          name={name}
          address={address}
          pets={pets}
          setShowModalEdit={setShowModalEdit}
        />
      )}
    </>
  );
};

export { CardPetOwner };
