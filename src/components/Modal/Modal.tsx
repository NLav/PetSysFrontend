import { X } from "@phosphor-icons/react";
import { Button } from "components";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import "./Modal.scss";

interface IButton {
  label: string;
  onClick: () => void;
}

interface IModalProps {
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
  buttons?: IButton[];
}

const Modal = ({ title, closeModal, children, buttons }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, closeModal);
  return (
    <>
      <div className="modal-background"></div>

      <div className="modal" ref={modalRef}>
        <div className="modal__header">
          {title}
          <button>
            <X size={16} onClick={() => closeModal()} />
          </button>
        </div>

        <div className="modal__content">{children}</div>

        {buttons && (
          <div className="modal__footer">
            {buttons.map((button) => (
              <Button key={button.label} onClick={() => button.onClick()}>
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export { Modal };
