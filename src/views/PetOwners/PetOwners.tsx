import { ActionBar, Spinner } from "components";
import { CardPetOwner } from "components/CardPetOwner";
import { NoItemsContainer } from "components/NoItemsContainer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import * as S from "./PetOwners.styles";

const PetOwners = () => {
  const { petOwnersPaginated, listingParams, meta, loading, error } =
    useAppSelector((state) => state.petOwners);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleGetPetOwnersPaginated = () => {
      dispatch(getPetOwnersPaginated({ listingParams, meta }));
    };

    handleGetPetOwnersPaginated();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <ActionBar title="Tutores"></ActionBar>

      <S.ListingContainer>
        {loading.petOwnersPaginated ? (
          <Spinner />
        ) : error.petOwnersPaginated ? (
          <NoItemsContainer text="Erro ao realizar listagem" />
        ) : !petOwnersPaginated.length ? (
          <NoItemsContainer text="Nenhum tutor encontrado" />
        ) : (
          petOwnersPaginated.map((petOwner) => (
            <CardPetOwner key={petOwner.id} {...petOwner} />
          ))
        )}
      </S.ListingContainer>
    </S.Container>
  );
};

export { PetOwners };
