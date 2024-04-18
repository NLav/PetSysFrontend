import { SortAscending, SortDescending } from "@phosphor-icons/react";
import { ActionBarModal } from "components";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import { PetOwnersModals } from "views/PetOwners";
import * as S from "./PetOwnersModalOrder.styles";

interface IPetsModalOrderProps {
  setShowModal: React.Dispatch<React.SetStateAction<PetOwnersModals>>;
}

const PetOwnersModalOrder = ({ setShowModal }: IPetsModalOrderProps) => {
  const dispatch = useAppDispatch();

  const { listingParams, meta } = useAppSelector((state) => state.petOwners);

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
                getPetOwnersPaginated({
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
                getPetOwnersPaginated({
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
          <span>Raça</span>

          <S.OrderButton
            $selected={
              listingParams.orderBy === "address" &&
              listingParams.orderDirection === "asc"
            }
            onClick={() => {
              dispatch(
                getPetOwnersPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "address",
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
              listingParams.orderBy === "address" &&
              listingParams.orderDirection === "desc"
            }
            onClick={() => {
              dispatch(
                getPetOwnersPaginated({
                  listingParams: {
                    ...listingParams,
                    orderBy: "address",
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

export { PetOwnersModalOrder };
