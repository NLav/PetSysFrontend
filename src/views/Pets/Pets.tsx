import {
  ArrowsDownUp,
  FunnelSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { ActionBar, CardPet, Pagination } from "components";
import { useState } from "react";
import { IPaginationMeta } from "types";
import "./Pets.scss";
import { PetsModalFilter } from "./components";

const Pets = () => {
  const [showModal, setShowModal] = useState<
    "search-modal" | "order-modal" | "filter-modal" | null
  >(null);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta>({
    currentPage: 1,
    totalPages: 15,
  });

  return (
    <div className="pets">
      <ActionBar title="Pets">
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

        {showModal === "filter-modal" ? (
          <PetsModalFilter setShowModal={setShowModal} />
        ) : (
          <></>
        )}
      </ActionBar>

      <div className="pets__listing-container">
        <CardPet
          imageUrl="https://www.thesprucepets.com/thmb/y4YEErOurgco9QQO-zJ6Ld1yVkQ=/3000x0/filters:no_upscale():strip_icc()/english-dog-breeds-4788340-hero-14a64cf053ca40f78e5bd078b052d97f.jpg"
          name="Totó"
          birthDate={new Date()}
          breed="Vira-lata"
        />
        <CardPet
          imageUrl="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?cs=srgb&dl=pexels-valeria-boltneva-1805164.jpg&fm=jpg"
          name="Totó"
          birthDate={new Date()}
          breed="Vira-lata"
        />
        <CardPet
          imageUrl="https://www.shutterstock.com/image-photo/studio-portrait-sitting-tabby-cat-600nw-2269389471.jpg"
          name="Totó"
          birthDate={new Date()}
          breed="Vira-lata"
        />
        <CardPet
          imageUrl="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg"
          name="Totó"
          birthDate={new Date()}
          breed="Vira-lata"
        />
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
