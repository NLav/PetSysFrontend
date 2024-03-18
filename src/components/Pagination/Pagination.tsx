import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Combobox } from "components";
import { IPaginationMeta } from "interfaces";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import "./Pagination.scss";

interface IPaginationProps extends IPaginationMeta {
  limitOptions: string[];
}

const Pagination = ({
  restPage,
  restTotal,
  restLimit,
  limitOptions,
}: IPaginationProps) => {
  const { listingParams, meta } = useAppSelector((state) => state.pets);

  const dispatch = useAppDispatch();

  const normalizeNumber = (value: string) => {
    const normalizedValue = "0" + value;

    return normalizedValue.slice(
      normalizedValue.length - 2,
      normalizedValue.length
    );
  };

  const paginationPath = Array.from({ length: Number(restTotal) });

  return (
    <div className="pagination">
      <div className="pagination__combobox-container">
        <Combobox
          title="Itens por página"
          options={limitOptions}
          value={restLimit}
          setValue={(value) => {
            dispatch(
              getPetsPaginated({
                listingParams,
                meta: { ...meta, restLimit: value },
              })
            );
          }}
          searchable={false}
        />
      </div>

      <button
        className="pagination__caret-button"
        onClick={() => {
          dispatch(
            getPetsPaginated({
              listingParams,
              meta: { ...meta, restPage: "1" },
            })
          );
        }}
        disabled={restPage === "1"}
      >
        <CaretDoubleLeft size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() => {
          dispatch(
            getPetsPaginated({
              listingParams,
              meta: { ...meta, restPage: String(Number(restPage) - 1) },
            })
          );
        }}
        disabled={restPage === "1"}
      >
        <CaretLeft size={16} weight="bold" />
      </button>

      <div className="pagination__path">
        {paginationPath.map((_, index) => (
          <span
            key={index + 1}
            onClick={() => {
              dispatch(
                getPetsPaginated({
                  listingParams,
                  meta: { ...meta, restPage: String(index + 1) },
                })
              );
            }}
            style={{
              ...(restPage === String(index + 1)
                ? {
                    backgroundColor: "var(--primary)",
                    border: "2px solid var(--secondary)",
                    scale: "1.15",
                  }
                : {}),
            }}
          >
            {normalizeNumber(String(index + 1))}
          </span>
        ))}
      </div>

      <button
        className="pagination__caret-button"
        onClick={() => {
          dispatch(
            getPetsPaginated({
              listingParams,
              meta: { ...meta, restPage: String(Number(restPage) + 1) },
            })
          );
        }}
        disabled={restPage === String(restTotal)}
      >
        <CaretRight size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() => {
          dispatch(
            getPetsPaginated({
              listingParams,
              meta: { ...meta, restPage: String(restTotal) },
            })
          );
        }}
        disabled={restPage === String(restTotal)}
      >
        <CaretDoubleRight size={16} weight="bold" />
      </button>
    </div>
  );
};

export { Pagination };
