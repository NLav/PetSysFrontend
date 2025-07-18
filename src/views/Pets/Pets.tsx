import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { ActionBar, CardPet, Pagination, Spinner } from "components";
import { NoItemsContainer } from "components/NoItemsContainer";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import { getNumberOfColumns } from "utils";
import * as S from "./Pets.styles";
import {
  PetsModalAdd,
  PetsModalFilter,
  PetsModalOrder,
  PetsModalSearch,
} from "./components";

export type PetsModals =
  | "add-modal"
  | "search-modal"
  | "order-modal"
  | "filter-modal"
  | null;

const Pets = () => {
  const [showModal, setShowModal] = useState<PetsModals>(null);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(1);
  const [limitOptions, setLimitOptions] = useState<string[]>([]);

  const { petsPaginated, listingParams, meta, loading, error } = useAppSelector(
    (state) => state.pets
  );

  const childWidth = 240;

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
      String(numberOfColumns * 2),
      String(numberOfColumns * 4),
      String(numberOfColumns * 8),
    ]);
  }, [numberOfColumns]);

  useEffect(() => {
    const handleGetPetsPaginated = () => {
      dispatch(
        getPetsPaginated({
          listingParams,
          meta: { ...meta, restLimit: limitOptions[0] },
        })
      );
    };

    limitOptions && limitOptions[0] && handleGetPetsPaginated();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitOptions]);

  return (
    <S.Container>
      <ActionBar title="Pets">
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
          <PetsModalAdd setShowModal={setShowModal} />
        )}

        {showModal === "search-modal" && (
          <PetsModalSearch setShowModal={setShowModal} />
        )}

        {showModal === "order-modal" && (
          <PetsModalOrder setShowModal={setShowModal} />
        )}

        {showModal === "filter-modal" && (
          <PetsModalFilter setShowModal={setShowModal} />
        )}
      </ActionBar>

      <S.ListingContainer
        ref={listingRef}
        style={{
          gridTemplateColumns: `repeat(${numberOfColumns}, ${100 / numberOfColumns - 1}%)`,
        }}
      >
        {loading.petsPaginated ? (
          <Spinner />
        ) : error.petsPaginated ? (
          <NoItemsContainer text="Erro ao realizar listagem" />
        ) : !petsPaginated.length ? (
          <NoItemsContainer text="Nenhum pet encontrado" />
        ) : (
          petsPaginated.map((pet) => <CardPet key={pet.id} {...pet} />)
        )}
      </S.ListingContainer>

      <Pagination
        meta={meta}
        handleChangePage={(value) =>
          dispatch(
            getPetsPaginated({
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
            getPetsPaginated({
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

export { Pets };
