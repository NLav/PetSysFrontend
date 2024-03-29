import { Plus } from "@phosphor-icons/react";
import { ActionBar, Spinner } from "components";
import { CardPetOwner } from "components/CardPetOwner";
import { NoItemsContainer } from "components/NoItemsContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import * as S from "./PetOwners.styles";
import { PetOwnersModalAdd } from "./components";

export let petOwnersModals: "add-modal" | null;

const PetOwners = () => {
  const [showModal, setShowModal] = useState<typeof petOwnersModals>(null);

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
      <ActionBar title="Tutores">
        <button
          onClick={() =>
            setShowModal(showModal !== "add-modal" ? "add-modal" : null)
          }
        >
          <Plus size={16} weight="bold" />

          <span>Adicionar</span>
        </button>

        {showModal === "add-modal" && (
          <PetOwnersModalAdd setShowModal={setShowModal} />
        )}
      </ActionBar>

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
