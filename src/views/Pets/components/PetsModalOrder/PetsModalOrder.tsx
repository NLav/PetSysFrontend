import { SortAscending, SortDescending } from "@phosphor-icons/react";
import { ActionBarModal } from "components";
import { RefreshListingContext } from "contexts";
import { useContext } from "react";
import { IPetGetAllParams } from "services/dtos";
import { petsModals } from "../../Pets";
import "./PetsModalOrder.scss";

interface IPetsModalOrderProps {
  listingParams: IPetGetAllParams;
  setListingParams: React.Dispatch<React.SetStateAction<IPetGetAllParams>>;
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const PetsModalOrder = ({
  listingParams,
  setListingParams,
  setShowModal,
}: IPetsModalOrderProps) => {
  const { setRefreshListing } = useContext(RefreshListingContext);

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
              setListingParams((current) => ({
                ...current,
                orderBy: "name",
                orderDirection: "asc",
              }));

              setRefreshListing(true);
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
              setListingParams((current) => ({
                ...current,
                orderBy: "name",
                orderDirection: "desc",
              }));

              setRefreshListing(true);
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
              setListingParams((current) => ({
                ...current,
                orderBy: "birth_date",
                orderDirection: "asc",
              }));

              setRefreshListing(true);
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
              setListingParams((current) => ({
                ...current,
                orderBy: "birth_date",
                orderDirection: "desc",
              }));

              setRefreshListing(true);
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
              setListingParams((current) => ({
                ...current,
                orderBy: "breed",
                orderDirection: "asc",
              }));

              setRefreshListing(true);
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
              setListingParams((current) => ({
                ...current,
                orderBy: "breed",
                orderDirection: "desc",
              }));

              setRefreshListing(true);
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
