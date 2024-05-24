import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
  Spinner,
} from "@phosphor-icons/react";
import { ActionBar, CardUser, Pagination } from "components";
import { NoItemsContainer } from "components/NoItemsContainer";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getUsersPaginated } from "stores/users/thunks";
import { getNumberOfColumns } from "utils";
import * as S from "./Users.styles";

export type UsersModals =
  | "add-modal"
  | "search-modal"
  | "order-modal"
  | "order-modal"
  | "filter-modal"
  | null;

const Users = () => {
  const [showModal, setShowModal] = useState<UsersModals>(null);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(1);
  const [limitOptions, setLimitOptions] = useState<string[]>([]);

  const { usersPaginated, listingParams, meta, loading, error } =
    useAppSelector((state) => state.users);

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
      String(numberOfColumns * 4),
      String(numberOfColumns * 8),
      String(numberOfColumns * 10),
    ]);
  }, [numberOfColumns]);

  useEffect(() => {
    const handleGetUsersPaginated = () => {
      dispatch(
        getUsersPaginated({
          listingParams,
          meta: { ...meta, restLimit: limitOptions[0] },
        })
      );
    };

    limitOptions && limitOptions[0] && handleGetUsersPaginated();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitOptions]);

  return (
    <S.Container>
      <ActionBar title="Usuários">
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

        {/*
          {showModal === "add-modal" && (
          <PetsModaPetsAdd setShowModal={setShowModal} />
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
          */}
      </ActionBar>

      <S.ListingContainer
        ref={listingRef}
        style={{
          gridTemplateColumns: `repeat(${numberOfColumns}, ${100 / numberOfColumns - 1}%)`,
        }}
      >
        {loading.usersPaginated ? (
          <Spinner />
        ) : error.usersPaginated ? (
          <NoItemsContainer text="Erro ao realizar listagem" />
        ) : !usersPaginated.length ? (
          <NoItemsContainer text="Nenhum pet encontrado" />
        ) : (
          usersPaginated.map((user) => <CardUser key={user.id} {...user} />)
        )}
      </S.ListingContainer>

      <Pagination
        meta={meta}
        handleChangePage={(value) =>
          dispatch(
            getUsersPaginated({
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
            getUsersPaginated({
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

export { Users };
