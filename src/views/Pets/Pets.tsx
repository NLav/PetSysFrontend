import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { ActionBar, CardPet, Pagination, Spinner } from "components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import "./Pets.scss";
import {
  PetsModalAdd,
  PetsModalFilter,
  PetsModalOrder,
  PetsModalSearch,
} from "./components";

export let petsModals:
  | "add-modal"
  | "search-modal"
  | "order-modal"
  | "filter-modal"
  | null;

const Pets = () => {
  const [showModal, setShowModal] = useState<typeof petsModals>(null);

  const { petsPaginated, listingParams, meta, loading } = useAppSelector(
    (state) => state.pets
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleGetPetsPaginated = () => {
      dispatch(getPetsPaginated({ listingParams, meta }));
    };

    handleGetPetsPaginated();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pets">
      <button></button>

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

      <div className="pets__listing-container">
        {loading.petsPaginated ? (
          <Spinner />
        ) : !petsPaginated.length ? (
          <span className="pets__listing-container__no-pets-container">
            Nenhum pet encontrado
          </span>
        ) : (
          petsPaginated.map((pet) => <CardPet key={pet.id} {...pet} />)
        )}
      </div>

      <Pagination
        limitOptions={["3", "4", "5", "6", "8", "10"]}
        numbersAroundRestPage={3}
      />
    </div>
  );
};

export { Pets };
