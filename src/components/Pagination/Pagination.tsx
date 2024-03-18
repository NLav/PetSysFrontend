import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { RefreshListingContext } from "contexts";
import { useContext } from "react";
import { IPaginationMeta } from "types";
import "./Pagination.scss";

interface IPaginationProps extends IPaginationMeta {
  setPaginationMeta: React.Dispatch<React.SetStateAction<IPaginationMeta>>;
}

const Pagination = ({
  restPage,
  restTotal,
  setPaginationMeta,
}: IPaginationProps) => {
  const { setRefreshListing } = useContext(RefreshListingContext);

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
      <button
        className="pagination__caret-button"
        onClick={() => {
          setPaginationMeta((current) => ({ ...current, restPage: "1" }));

          setRefreshListing(true);
        }}
        disabled={restPage === "1"}
      >
        <CaretDoubleLeft size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() => {
          setPaginationMeta((current) => ({
            ...current,
            restPage: String(Number(restPage) - 1),
          }));

          setRefreshListing(true);
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
              setPaginationMeta((current) => ({
                ...current,
                restPage: String(index + 1),
              }));

              setRefreshListing(true);
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
          setPaginationMeta((current) => ({
            ...current,
            restPage: String(Number(restPage) + 1),
          }));

          setRefreshListing(true);
        }}
        disabled={restPage === String(paginationPath.length)}
      >
        <CaretRight size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() => {
          setPaginationMeta((current) => ({
            ...current,
            restPage: String(paginationPath.length),
          }));

          setRefreshListing(true);
        }}
        disabled={restPage === String(paginationPath.length)}
      >
        <CaretDoubleRight size={16} weight="bold" />
      </button>
    </div>
  );
};

export { Pagination };
