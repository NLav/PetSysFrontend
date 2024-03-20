import { X } from "@phosphor-icons/react";
import { Button } from "components";
import { IButtonProps } from "components/Button/Button";
import { FormHTMLAttributes, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import * as S from "./ActionBarModal.styles";

interface IButton {
  label: string;
  variant: IButtonProps["variant"];
  type: "button" | "submit";
  onClick?: () => void;
}

export interface IActionBarModalProps
  extends FormHTMLAttributes<HTMLFormElement> {
  closeModal: () => void;
  buttons?: IButton[];
}

const ActionBarModal = ({
  closeModal,
  buttons,
  title,
  children,
}: IActionBarModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, closeModal);

  return (
    <S.Container ref={modalRef}>
      <S.Header>
        {title}

        <button>
          <X size={16} onClick={() => closeModal()} />
        </button>
      </S.Header>

      {children}

      {buttons && (
        <S.Footer>
          {buttons.map((button) => (
            <Button
              key={button.label}
              variant={button.variant}
              onClick={button.onClick}
              type={button.type ? button.type : "button"}
            >
              {button.label}
            </Button>
          ))}
        </S.Footer>
      )}
    </S.Container>
  );
};

export { ActionBarModal };
