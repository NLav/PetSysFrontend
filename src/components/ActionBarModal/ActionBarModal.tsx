import { X } from "@phosphor-icons/react";
import { Button } from "components";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import "./ActionBarModal.scss";

interface IButton {
  label: string;
  onClick: () => void;
}

interface IActionBarModalProps {
  title: string;
  closeModal: () => void;
  children: React.ReactNode | React.ReactNode[];
  buttons?: IButton[];
}

const ActionBarModal = ({
  title,
  closeModal,
  children,
  buttons,
}: IActionBarModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, closeModal);

  return (
    <div className="action-bar-modal" ref={modalRef}>
      <div className="action-bar-modal__header">
        {title}
        <button>
          <X size={16} onClick={() => closeModal()} />
        </button>
      </div>

      <div className="action-bar-modal__content">{children}</div>

      {buttons && (
        <div className="action-bar-modal__footer">
          {buttons.map((button) => (
            <Button key={button.label} onClick={() => button.onClick()}>
              {button.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export { ActionBarModal };
