import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
  Spinner,
} from "@phosphor-icons/react";
import { ActionBar, CardUser, Pagination } from "components";
import { NoItemsContainer } from "components/NoItemsContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getUsersPaginated } from "stores/users/thunks";
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

  const { usersPaginated, listingParams, meta, loading, error } =
    useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleGetUsersPaginated = () => {
      dispatch(getUsersPaginated({ listingParams, meta }));
    };

    handleGetUsersPaginated();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <S.ListingContainer>
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
        limitOptions={["6", "8", "10", "12", "16", "20"]}
      />
    </S.Container>
  );
};

export { Users };
