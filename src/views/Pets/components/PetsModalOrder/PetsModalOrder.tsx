import { SortAscending, SortDescending } from "@phosphor-icons/react";
import { ActionBarModal } from "components";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import { petsModals } from "../../Pets";
import "./PetsModalOrder.scss";

interface IPetsModalOrderProps {
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const PetsModalOrder = ({ setShowModal }: IPetsModalOrderProps) => {
  const dispatch = useAppDispatch();

  const { listingParams, meta } = useAppSelector((state) => state.pets);

  return (
    <ActionBarModal title="Ordenação" closeModal={() => setShowModal(null)}>
      <div className="pets-modal-order">
        <div className="pets-modal-order__option-container">
          <span>Nome</span>

          <button
            className={`${
              listingParams.orderBy === "name" &&
              listingParams.orderDirection === "asc" &&
              "pets-modal-order__option-container__selected"
            }`}
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
          </button>

          <button
            className={`${
              listingParams.orderBy === "name" &&
              listingParams.orderDirection === "desc" &&
              "pets-modal-order__option-container__selected"
            }`}
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
          </button>
        </div>

        <div className="pets-modal-order__option-container">
          <span>Data de nascimento</span>

          <button
            className={`${
              listingParams.orderBy === "birth_date" &&
              listingParams.orderDirection === "asc" &&
              "pets-modal-order__option-container__selected"
            }`}
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
          </button>

          <button
            className={`${
              listingParams.orderBy === "birth_date" &&
              listingParams.orderDirection === "desc" &&
              "pets-modal-order__option-container__selected"
            }`}
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
          </button>
        </div>

        <div className="pets-modal-order__option-container">
          <span>Raça</span>

          <button
            className={`${
              listingParams.orderBy === "breed" &&
              listingParams.orderDirection === "asc" &&
              "pets-modal-order__option-container__selected"
            }`}
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
          </button>

          <button
            className={`${
              listingParams.orderBy === "breed" &&
              listingParams.orderDirection === "desc" &&
              "pets-modal-order__option-container__selected"
            }`}
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
          </button>
        </div>
      </div>
    </ActionBarModal>
  );
};

export { PetsModalOrder };
