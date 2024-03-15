import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { IPaginationMeta } from "types";
import "./Pagination.scss";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  setPaginationMeta: React.Dispatch<React.SetStateAction<IPaginationMeta>>;
}

const Pagination = ({
  currentPage,
  totalPages,
  setPaginationMeta,
}: IPaginationProps) => {
  const normalizeNumber = (value: string) => {
    const normalizedValue = "0" + value;

    return normalizedValue.slice(
      normalizedValue.length - 2,
      normalizedValue.length
    );
  };

  const paginationPath = Array.from({ length: totalPages }, (_, index) => (
    <span
      key={index + 1}
      onClick={() =>
        setPaginationMeta((current) => ({ ...current, currentPage: index + 1 }))
      }
      style={{
        ...(currentPage === index + 1
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
  ));

  return (
    <div className="pagination">
      <button
        className="pagination__caret-button"
        onClick={() =>
          setPaginationMeta((current) => ({ ...current, currentPage: 1 }))
        }
        disabled={currentPage === 1}
      >
        <CaretDoubleLeft size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() =>
          setPaginationMeta((current) => ({
            ...current,
            currentPage: currentPage - 1,
          }))
        }
        disabled={currentPage === 1}
      >
        <CaretLeft size={16} weight="bold" />
      </button>

      <div className="pagination__path">{paginationPath}</div>

      <button
        className="pagination__caret-button"
        onClick={() =>
          setPaginationMeta((current) => ({
            ...current,
            currentPage: currentPage + 1,
          }))
        }
        disabled={currentPage === paginationPath.length}
      >
        <CaretRight size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() =>
          setPaginationMeta((current) => ({
            ...current,
            currentPage: paginationPath.length,
          }))
        }
        disabled={currentPage === paginationPath.length}
      >
        <CaretDoubleRight size={16} weight="bold" />
      </button>
    </div>
  );
};

export { Pagination };
