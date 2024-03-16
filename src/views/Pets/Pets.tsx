import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { ActionBar, CardPet, Pagination } from "components";
import { useEffect, useState } from "react";
import { PetService } from "services";
import { IPetDTO } from "services/dtos";
import { IPaginationMeta } from "types";
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
  const [pets, setPets] = useState<IPetDTO[]>([]);
  const [showModal, setShowModal] = useState<typeof petsModals>(null);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta>({
    currentPage: 1,
    totalPages: 15,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PetService.getAll().then((response) => {
      setPets(response.data);
      setLoading(false);
    });
  }, []);

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
        {loading ? (
          <div>carregando</div>
        ) : pets.length === 0 ? (
          <div>nenhum pet</div>
        ) : (
          pets.map((pet) => (
            <CardPet
              key={pet.id}
              name={pet.name}
              imageUrl={pet.image_url}
              birthDate={pet.birth_date}
              breed={pet.breed}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={paginationMeta.currentPage}
        totalPages={paginationMeta.totalPages}
        setPaginationMeta={setPaginationMeta}
      />
    </div>
  );
};

export { Pets };
