import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Combobox } from "components";
import { useWindowSize } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import { useOnClickOutside } from "usehooks-ts";
import { normalizeNumber } from "utils";
import * as S from "./Pagination.styles";

interface IPaginationProps {
  limitOptions: string[];
  numbersAroundRestPage?: number;
}

const Pagination = ({ limitOptions }: IPaginationProps) => {
  const [restPageInput, setRestPageInput] = useState("");

  const { listingParams, meta } = useAppSelector((state) => state.pets);

  const dispatch = useAppDispatch();
  const { windowSize } = useWindowSize();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const paginationPath = Array.from({ length: meta.restTotal });

  const handleChangeInput = (
    event: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    event.preventDefault();

    handleChangeRestPage(value);
  };

  const handleChangeRestPage = (value: string) => {
    if (Number(value) < 1 || Number(value) > meta.restTotal) return;

    dispatch(
      getPetsPaginated({
        listingParams,
        meta: {
          ...meta,
          restPage: value,
        },
      })
    );
  };

  useEffect(() => {
    setRestPageInput(normalizeNumber(meta.restPage, 2));
  }, [meta.restPage]);

  useOnClickOutside(inputRef, () =>
    setRestPageInput(normalizeNumber(meta.restPage, 2))
  );
  return (
    <S.Container>
      {windowSize.width > 500 && (
        <S.ComboboxContainer>
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
        </S.ComboboxContainer>
      )}

      <S.PaginationContainer>
        <S.PaginationChild
          onClick={() =>
            handleChangeRestPage(String(Number(meta.restPage) - 1))
          }
        >
          <CaretLeft size={24} />
        </S.PaginationChild>

        <S.PaginationPathContainer>
          {Number(meta.restPage) > 1 && (
            <S.PaginationPathBefore>
              {paginationPath
                .slice(0, Number(meta.restPage) - 1)
                .map((_, index) => (
                  <S.PaginationChild
                    key={index + 1}
                    onClick={() => handleChangeRestPage(String(index + 1))}
                  >
                    {normalizeNumber(String(index + 1), 2)}
                  </S.PaginationChild>
                ))
                .reverse()}
            </S.PaginationPathBefore>
          )}

          <S.RestPageContainer
            onSubmit={(event) =>
              handleChangeInput(
                event,
                Number(restPageInput) < 1
                  ? "01"
                  : Number(restPageInput) > meta.restTotal
                    ? String(meta.restTotal)
                    : restPageInput
              )
            }
          >
            <S.RestPageInput
              ref={inputRef}
              value={restPageInput}
              onChange={(event) =>
                setRestPageInput(event.target.value.replace(/[A-z]/, ""))
              }
            />
          </S.RestPageContainer>

          {Number(meta.restPage) < meta.restTotal && (
            <S.PaginationPathAfter>
              {paginationPath
                .slice(Number(meta.restPage), meta.restTotal)
                .map((_, index) => (
                  <S.PaginationChild
                    key={index + Number(meta.restPage) + 1}
                    onClick={() =>
                      handleChangeRestPage(
                        String(index + Number(meta.restPage) + 1)
                      )
                    }
                  >
                    {normalizeNumber(
                      String(index + Number(meta.restPage) + 1),
                      2
                    )}
                  </S.PaginationChild>
                ))}
            </S.PaginationPathAfter>
          )}
        </S.PaginationPathContainer>

        <S.PaginationChild
          onClick={() =>
            handleChangeRestPage(String(Number(meta.restPage) + 1))
          }
        >
          <CaretRight size={24} />
        </S.PaginationChild>
      </S.PaginationContainer>
    </S.Container>
  );
};

export { Pagination };
