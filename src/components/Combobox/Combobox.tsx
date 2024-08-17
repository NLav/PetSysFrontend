import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { normalizeString } from "utils";
import * as S from "./Combobox.styles";

export interface IComboboxProps extends InputHTMLAttributes<HTMLInputElement> {
  options: string[];
  searchable: boolean;
  setValue: (value: string) => void;
}

const Combobox = ({
  options,
  searchable,
  setValue,
  title,
  value,
  ...rest
}: IComboboxProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [comboboxSearch, setComboboxSearch] = useState(value);
  const [showEveryOption, setShowEveryOption] = useState(true);
  const [optionsPosition, setOptionsPosition] = useState<"top" | "bottom">(
    "top"
  );
  const [optionsInset, setOptionsInset] = useState("0 0 auto");
  const [optionsWidth, setOptionsWidth] = useState("fit-content");

  const comboboxRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = showEveryOption
    ? options
    : options.filter((value) =>
        normalizeString(value).includes(normalizeString(String(comboboxSearch)))
      );

  useEffect(() => {
    setTimeout(
      () =>
        showOptions &&
        setOptionsPosition(
          window.innerHeight -
            (comboboxRef.current?.parentElement?.getBoundingClientRect()
              .bottom || 0) >
            (optionsRef.current?.getBoundingClientRect().height || 0)
            ? "bottom"
            : "top"
        ),
      100
    );
  }, [showOptions]);

  useEffect(() => {
    setComboboxSearch(value);
  }, [value]);

  useEffect(() => {
    const comboboxCurrent = comboboxRef.current?.getClientRects()[0];

    if (comboboxCurrent) {
      const insetPositions = {
        top:
          optionsPosition === "top"
            ? "auto"
            : `${comboboxCurrent.y + comboboxCurrent.height}px`,
        right: "auto",
        bottom:
          optionsPosition === "top"
            ? `${window.innerHeight - comboboxCurrent.y}px`
            : "auto",
        left: `${comboboxCurrent.x}px`,
      };

      setOptionsInset(
        `${insetPositions.top} ${insetPositions.right} ${insetPositions.bottom} ${insetPositions.left}`
      );
      setOptionsWidth(`${comboboxCurrent.width}px`);
    }
  }, [comboboxRef, optionsPosition]);

  useOnClickOutside(optionsRef, () => {
    setShowOptions(false);
    setShowEveryOption(true);
  });

  return (
    <S.Container ref={comboboxRef} onFocus={() => setShowOptions(true)}>
      <input
        {...rest}
        id="combobox-input"
        value={comboboxSearch}
        onChange={(event) => {
          setComboboxSearch(event.target.value);
          setShowEveryOption(false);
        }}
        placeholder=" "
        onClick={() => setShowOptions(true)}
        readOnly={!searchable}
        style={{ cursor: searchable ? "text" : "default" }}
      />

      <label htmlFor="combobox-input">{title}</label>

      {showOptions && (
        <S.OptionsContainer
          ref={optionsRef}
          $optionsInset={optionsInset}
          $optionsWidth={optionsWidth}
        >
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <button
                key={`${option}-${index}`}
                onClick={() => {
                  setValue(option);
                  setComboboxSearch(option);
                  setShowOptions(false);
                  setShowEveryOption(true);
                }}
              >
                {option}
              </button>
            ))
          ) : (
            <span>Sem resultados</span>
          )}
        </S.OptionsContainer>
      )}
    </S.Container>
  );
};

export { Combobox };
