import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { ActionBar, Pagination, Spinner } from "components";
import { CardPetOwner } from "components/CardPetOwner";
import { NoItemsContainer } from "components/NoItemsContainer";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import { getNumberOfColumns } from "utils";
import * as S from "./PetOwners.styles";
import {
  PetOwnersModalAdd,
  PetOwnersModalFilter,
  PetOwnersModalOrder,
  PetOwnersModalSearch,
} from "./components";

export type PetOwnersModals =
  | "add-modal"
  | "search-modal"
  | "order-modal"
  | "filter-modal"
  | null;

const PetOwners = () => {
  const [showModal, setShowModal] = useState<PetOwnersModals>(null);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(1);
  const [limitOptions, setLimitOptions] = useState<string[]>([]);

  const { petOwnersPaginated, listingParams, meta, loading, error } =
    useAppSelector((state) => state.petOwners);

  const childWidth = 320;

  const listingRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (listingRef && listingRef !== null) {
        setNumberOfColumns(getNumberOfColumns(listingRef, childWidth));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLimitOptions([
      String(numberOfColumns * 4),
      String(numberOfColumns * 8),
      String(numberOfColumns * 10),
    ]);
  }, [numberOfColumns]);

  useEffect(() => {
    const handleGetPetOwnersPaginated = () => {
      dispatch(
        getPetOwnersPaginated({
          listingParams,
          meta: { ...meta, restLimit: limitOptions[0] },
        })
      );
    };

    limitOptions && limitOptions[0] && handleGetPetOwnersPaginated();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitOptions]);

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

      <S.ListingContainer
        ref={listingRef}
        style={{
          gridTemplateColumns: `repeat(${numberOfColumns}, ${100 / numberOfColumns - 1}%)`,
        }}
      >
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
        limitOptions={limitOptions}
      />
    </S.Container>
  );
};

export { PetOwners };
