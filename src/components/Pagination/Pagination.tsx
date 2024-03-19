import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
  DotsThree,
} from "@phosphor-icons/react";
import { Combobox } from "components";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import { useOnClickOutside } from "usehooks-ts";
import "./Pagination.scss";

interface IPaginationProps {
  limitOptions: string[];
  numbersAroundRestPage?: number;
}

const Pagination = ({
  limitOptions,
  numbersAroundRestPage = 3,
}: IPaginationProps) => {
  const [restPageInput, setRestPageInput] = useState("");

  const { listingParams, meta } = useAppSelector((state) => state.pets);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const paginationPath = Array.from({ length: numbersAroundRestPage });

  const normalizeNumber = (value: string) => {
    const normalizedValue = "0" + value;

    return normalizedValue.slice(
      normalizedValue.length - 2,
      normalizedValue.length
    );
  };

  const handleChangeRestPage = (value: string) => {
    dispatch(
      getPetsPaginated({
        listingParams,
        meta: { ...meta, restPage: value },
      })
    );
  };

  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Number(restPageInput) < 1) {
      setRestPageInput("1");

      return handleChangeRestPage("1");
    }
    if (Number(restPageInput) > meta.restTotal) {
      setRestPageInput(String(meta.restTotal));

      return handleChangeRestPage(String(meta.restTotal));
    }

    handleChangeRestPage(restPageInput);
  };

  useEffect(() => {
    setRestPageInput(normalizeNumber(meta.restPage));
  }, [meta.restPage]);

  useOnClickOutside(inputRef, () =>
    setRestPageInput(normalizeNumber(meta.restPage))
  );

  return (
    <div className="pagination">
      <div className="pagination__combobox-container">
        <Combobox
          title="Itens por página"
          options={limitOptions}
          value={meta.restLimit}
          setValue={(value) => {
            dispatch(
              getPetsPaginated({
                listingParams,
                meta: { ...meta, restPage: "1", restLimit: value },
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
        disabled={meta.restPage === "1"}
      >
        <CaretDoubleLeft size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() => {
          dispatch(
            getPetsPaginated({
              listingParams,
              meta: { ...meta, restPage: String(Number(meta.restPage) - 1) },
            })
          );
        }}
        disabled={meta.restPage === "1"}
      >
        <CaretLeft size={16} weight="bold" />
      </button>

      <div className="pagination__path">
        <>
          {Number(meta.restPage) - numbersAroundRestPage === 2 && (
            <DotsThree
              size={16}
              style={{
                visibility: "hidden",
              }}
            />
          )}

          <span
            style={{
              visibility:
                Number(meta.restPage) - numbersAroundRestPage > 1
                  ? "unset"
                  : "hidden",
            }}
            onClick={() => handleChangeRestPage("1")}
          >
            01
          </span>

          {Number(meta.restPage) - numbersAroundRestPage !== 2 && (
            <DotsThree
              size={16}
              style={{
                visibility:
                  Number(meta.restPage) - numbersAroundRestPage > 2
                    ? "unset"
                    : "hidden",
              }}
            />
          )}
        </>

        {paginationPath
          .map((_, index) => {
            const currentValue = Number(meta.restPage) - index - 1;

            return (
              <span
                key={currentValue}
                style={{ visibility: currentValue >= 1 ? "unset" : "hidden" }}
                onClick={() => handleChangeRestPage(String(currentValue))}
              >
                {normalizeNumber(String(currentValue))}
              </span>
            );
          })
          .reverse()}

        <form onSubmit={(event) => handleInputSubmit(event)}>
          <input
            ref={inputRef}
            value={restPageInput}
            onChange={(event) => setRestPageInput(event.target.value)}
          />
        </form>

        {paginationPath.map((_, index) => {
          const currentValue = Number(meta.restPage) + index + 1;

          return (
            <span
              key={currentValue}
              style={{
                visibility: currentValue <= meta.restTotal ? "unset" : "hidden",
              }}
              onClick={() => handleChangeRestPage(String(currentValue))}
            >
              {normalizeNumber(String(currentValue))}
            </span>
          );
        })}

        <>
          {Number(meta.restPage) + numbersAroundRestPage !== meta.restTotal && (
            <DotsThree
              size={16}
              style={{
                visibility:
                  Number(meta.restPage) + numbersAroundRestPage <
                  meta.restTotal + 1
                    ? "unset"
                    : "hidden",
              }}
            />
          )}

          <span
            style={{
              visibility:
                Number(meta.restPage) + numbersAroundRestPage < meta.restTotal
                  ? "unset"
                  : "hidden",
            }}
            onClick={() => handleChangeRestPage(String(meta.restTotal))}
          >
            {meta.restTotal}
          </span>

          {Number(meta.restPage) + numbersAroundRestPage === meta.restTotal && (
            <DotsThree
              size={16}
              style={{
                visibility: "hidden",
              }}
            />
          )}
        </>
      </div>

      <button
        className="pagination__caret-button"
        onClick={() => {
          dispatch(
            getPetsPaginated({
              listingParams,
              meta: { ...meta, restPage: String(Number(meta.restPage) + 1) },
            })
          );
        }}
        disabled={meta.restPage === String(meta.restTotal)}
      >
        <CaretRight size={16} weight="bold" />
      </button>

      <button
        className="pagination__caret-button"
        onClick={() => {
          dispatch(
            getPetsPaginated({
              listingParams,
              meta: { ...meta, restPage: String(meta.restTotal) },
            })
          );
        }}
        disabled={meta.restPage === String(meta.restTotal)}
      >
        <CaretDoubleRight size={16} weight="bold" />
      </button>
    </div>
  );
};

export { Pagination };
