import { useState } from "react";
import { IUserDTO } from "services/dtos";
import * as S from "./CardUser.styles";
import { CardUserModalEdit } from "./components/CardUserModalEdit";

interface ICardUserProps extends Omit<IUserDTO, "password"> {}

const CardUser = ({ id, name, email }: ICardUserProps) => {
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

        <S.EmailContainer>
          <span>E-mail:</span>
          <span>{email}</span>
        </S.EmailContainer>
      </S.Container>

      {showModalEdit && (
        <CardUserModalEdit
          id={id}
          name={name}
          email={email}
          setShowModalEdit={setShowModalEdit}
        />
      )}
    </>
  );
};

export { CardUser };
