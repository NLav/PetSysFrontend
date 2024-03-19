import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import "./Combobox.scss";

interface IComboboxProps extends InputHTMLAttributes<HTMLInputElement> {
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

  const comboboxRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = showEveryOption
    ? options
    : options.filter((value) => value.includes(String(comboboxSearch)));

  useEffect(() => {
    setTimeout(
      () =>
        showOptions &&
        setOptionsPosition(
          window.innerHeight -
            (comboboxRef.current?.getBoundingClientRect().bottom || 0) >
            (optionsRef.current?.getBoundingClientRect().height || 0)
            ? "bottom"
            : "top"
        ),
      100
    );
  }, [showOptions]);

  useOnClickOutside(optionsRef, () => {
    setShowOptions(false);
    setShowEveryOption(true);
  });

  return (
    <div className="combobox" ref={comboboxRef}>
      <label htmlFor="combobox-input">{title}</label>

      <input
        {...rest}
        id="combobox-input"
        value={comboboxSearch}
        onChange={(event) => {
          setComboboxSearch(event.target.value);
          setShowEveryOption(false);
        }}
        onClick={() => setShowOptions(true)}
        readOnly={!searchable}
        style={{ cursor: searchable ? "text" : "default" }}
      />

      {showOptions && (
        <div
          className="combobox__options-container"
          ref={optionsRef}
          style={{
            inset:
              optionsPosition === "top"
                ? "auto 0 calc(100% - 1rem)"
                : "100% 0 auto",
          }}
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
        </div>
      )}
    </div>
  );
};

export { Combobox };
