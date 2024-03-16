import { X } from "@phosphor-icons/react";
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
  return (
    <div className="action-bar-modal">
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
            <button key={button.label} onClick={() => button.onClick()}>
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { ActionBarModal };
