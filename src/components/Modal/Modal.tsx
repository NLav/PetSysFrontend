import { X } from "@phosphor-icons/react";
import { Button } from "components";
import { IButtonProps } from "components/Button";
import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import * as S from "./Modal.styles";

interface IButton {
  label: string;
  variant: IButtonProps["variant"];
  onClick: () => void;
}

export interface IModalProps {
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
  buttons?: IButton[];
  width?: string;
  height?: string;
}

const Modal = ({
  title,
  closeModal,
  children,
  buttons,
  width = "fit-content",
  height = "fit-content",
}: IModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [closeModal]);

  useOnClickOutside(modalRef, closeModal);

  return (
    <>
      <S.Background></S.Background>

      <S.Container ref={modalRef} $width={width} $height={height}>
        <S.Header>
          {title}

          <button onClick={() => closeModal()}>
            <X size={16} />
          </button>
        </S.Header>

        <div>{children}</div>

        {buttons && (
          <S.Footer>
            {buttons.map((button) => (
              <Button
                key={button.label}
                variant={button.variant}
                onClick={() => button.onClick()}
              >
                {button.label}
              </Button>
            ))}
          </S.Footer>
        )}
      </S.Container>
    </>
  );
};

export { Modal };
