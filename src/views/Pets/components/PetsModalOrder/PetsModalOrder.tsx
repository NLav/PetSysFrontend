import { SortAscending, SortDescending } from "@phosphor-icons/react";
import { ActionBarModal } from "components";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import { PetsModals } from "../../Pets";
import * as S from "./PetsModalOrder.styles";

interface IPetsModalOrderProps {
  setShowModal: React.Dispatch<React.SetStateAction<PetsModals>>;
}

const PetsModalOrder = ({ setShowModal }: IPetsModalOrderProps) => {
  const dispatch = useAppDispatch();

  const { listingParams, meta } = useAppSelector((state) => state.pets);

  return (
    <ActionBarModal title="Ordenação" closeModal={() => setShowModal(null)}>
      <S.Container>
        <S.OptionContainer>
          <span>Nome</span>

          <S.OrderButton
            $selected={
              listingParams.orderBy === "name" &&
              listingParams.orderDirection === "asc"
            }
            onClick={() => {
              dispatch(
                getPetsPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "name",
                    orderDirection: "asc",
                  },
                  meta,
                })
              );

              setShowModal(null);
            }}
          >
            <SortAscending size={32} />
          </S.OrderButton>

          <S.OrderButton
            $selected={
              listingParams.orderBy === "name" &&
              listingParams.orderDirection === "desc"
            }
            onClick={() => {
              dispatch(
                getPetsPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "name",
                    orderDirection: "desc",
                  },
                  meta,
                })
              );

              setShowModal(null);
            }}
          >
            <SortDescending size={32} />
          </S.OrderButton>
        </S.OptionContainer>

        <S.OptionContainer>
          <span>Data de nascimento</span>

          <S.OrderButton
            $selected={
              listingParams.orderBy === "birth_date" &&
              listingParams.orderDirection === "asc"
            }
            onClick={() => {
              dispatch(
                getPetsPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "birth_date",
                    orderDirection: "asc",
                  },
                  meta,
                })
              );

              setShowModal(null);
            }}
          >
            <SortAscending size={32} />
          </S.OrderButton>

          <S.OrderButton
            $selected={
              listingParams.orderBy === "birth_date" &&
              listingParams.orderDirection === "desc"
            }
            onClick={() => {
              dispatch(
                getPetsPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "birth_date",
                    orderDirection: "desc",
                  },
                  meta,
                })
              );

              setShowModal(null);
            }}
          >
            <SortDescending size={32} />
          </S.OrderButton>
        </S.OptionContainer>

        <S.OptionContainer>
          <span>Raça</span>

          <S.OrderButton
            $selected={
              listingParams.orderBy === "breed" &&
              listingParams.orderDirection === "asc"
            }
            onClick={() => {
              dispatch(
                getPetsPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "breed",
                    orderDirection: "asc",
                  },
                  meta,
                })
              );

              setShowModal(null);
            }}
          >
            <SortAscending size={32} />
          </S.OrderButton>

          <S.OrderButton
            $selected={
              listingParams.orderBy === "breed" &&
              listingParams.orderDirection === "desc"
            }
            onClick={() => {
              dispatch(
                getPetsPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "breed",
                    orderDirection: "desc",
                  },
                  meta,
                })
              );

              setShowModal(null);
            }}
          >
            <SortDescending size={32} />
          </S.OrderButton>
        </S.OptionContainer>
      </S.Container>
    </ActionBarModal>
  );
};

export { PetsModalOrder };
