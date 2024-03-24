import { X } from "@phosphor-icons/react";
import { Button } from "components";
import { IButtonProps } from "components/Button";
import { useRef } from "react";
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

  useOnClickOutside(modalRef, closeModal);
  return (
    <>
      <S.Background></S.Background>

      <S.Container ref={modalRef} $width={width} $height={height}>
        <S.Header>
          {title}

          <button>
            <X size={16} onClick={() => closeModal()} />
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
