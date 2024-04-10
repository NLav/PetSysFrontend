import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { ActionBar, Pagination, Spinner } from "components";
import { CardPetOwner } from "components/CardPetOwner";
import { NoItemsContainer } from "components/NoItemsContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import * as S from "./PetOwners.styles";
import {
  PetOwnersModalAdd,
  PetOwnersModalFilter,
  PetOwnersModalOrder,
  PetOwnersModalSearch,
} from "./components";

export let petOwnersModals:
  | "add-modal"
  | "search-modal"
  | "order-modal"
  | "filter-modal"
  | null;

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

        <button
          onClick={() =>
            setShowModal(showModal !== "search-modal" ? "search-modal" : null)
          }
        >
          <MagnifyingGlass size={16} weight="bold" />

          <span>Pesquisa</span>
        </button>

        <button
          onClick={() =>
            setShowModal(showModal !== "order-modal" ? "order-modal" : null)
          }
        >
          <ArrowsDownUp size={16} weight="bold" />

          <span>Ordenação</span>
        </button>

        <button
          onClick={() =>
            setShowModal(showModal !== "filter-modal" ? "filter-modal" : null)
          }
        >
          <FunnelSimple size={16} weight="bold" />

          <span>Filtros</span>
        </button>

        {showModal === "add-modal" && (
          <PetOwnersModalAdd setShowModal={setShowModal} />
        )}

        {showModal === "search-modal" && (
          <PetOwnersModalSearch setShowModal={setShowModal} />
        )}

        {showModal === "order-modal" && (
          <PetOwnersModalOrder setShowModal={setShowModal} />
        )}

        {showModal === "filter-modal" && (
          <PetOwnersModalFilter setShowModal={setShowModal} />
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

      <Pagination
        meta={meta}
        handleChangePage={(value) =>
          dispatch(
            getPetOwnersPaginated({
              listingParams,
              meta: {
                ...meta,
                restPage: value,
              },
            })
          )
        }
        handleChangeLimit={(value) =>
          dispatch(
            getPetOwnersPaginated({
              listingParams,
              meta: { ...meta, restPage: "1", restLimit: value },
            })
          )
        }
        limitOptions={["9", "12", "15", "18", "24", "30"]}
      />
    </S.Container>
  );
};

export { PetOwners };
