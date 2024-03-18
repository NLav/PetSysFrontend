import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { ActionBar, CardPet, Pagination, Spinner } from "components";
import { RefreshListingContext, ToastContext } from "contexts";
import { useContext, useEffect, useState } from "react";
import { PetService } from "services";
import { IPetDTO, IPetGetAllParams } from "services/dtos";
import { IPaginatedList, IPaginationMeta } from "types";
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
  const [paginatedPets, setPaginatedPets] = useState<IPaginatedList<IPetDTO>>({
    items: [],
    meta: { restLimit: "4", restPage: "1", restTotal: 1 },
  });
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta>({
    restPage: "1",
    restLimit: "4",
    restTotal: 1,
  });
  const [showModal, setShowModal] = useState<typeof petsModals>(null);
  const [loading, setLoading] = useState(true);
  const [listingParams, setListingParams] = useState<IPetGetAllParams>({
    quickSearch: "",
    orderBy: "name",
    orderDirection: "asc",
  });

  const { refreshListing, setRefreshListing } = useContext(
    RefreshListingContext
  );
  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    if (refreshListing) {
      setLoading(true);
      setRefreshListing(false);

      PetService.getAll(listingParams, paginationMeta)
        .then((response) => {
          console.log(response.data);
          setPaginatedPets(response.data);

          setLoading(false);
          setShowModal(null);
        })
        .catch((error) => {
          setToast({
            variant: "danger",
            title: "Erro na requisição dos itens",
            description: error.message,
          });

          setLoading(false);
        });
    }
  }, [
    refreshListing,
    listingParams,
    paginationMeta,
    setRefreshListing,
    setToast,
  ]);

  return (
    <div className="pets">
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
          <PetsModalSearch
            listingParams={listingParams}
            setListingParams={setListingParams}
            setShowModal={setShowModal}
          />
        )}

        {showModal === "order-modal" && (
          <PetsModalOrder
            setShowModal={setShowModal}
            listingParams={listingParams}
            setListingParams={setListingParams}
          />
        )}

        {showModal === "filter-modal" && (
          <PetsModalFilter setShowModal={setShowModal} />
        )}
      </ActionBar>

      <div className="pets__listing-container">
        {loading ? (
          <Spinner />
        ) : !paginatedPets.items.length ? (
          <span className="pets__listing-container__no-pets-container">
            Nenhum pet encontrado
          </span>
        ) : (
          paginatedPets.items.map((pet) => <CardPet key={pet.id} {...pet} />)
        )}
      </div>

      <Pagination
        restPage={paginatedPets.meta.restPage}
        restLimit={paginatedPets.meta.restLimit}
        restTotal={paginatedPets.meta.restTotal}
        setPaginationMeta={setPaginationMeta}
      />
    </div>
  );
};

export { Pets };
