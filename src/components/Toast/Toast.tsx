import { Check, Warning, X } from "@phosphor-icons/react";
import { ToastContext } from "contexts";
import { useContext, useEffect } from "react";
import "./Toast.scss";

const Toast = () => {
  const { toast, setToast } = useContext(ToastContext);

  useEffect(() => {
    setTimeout(() => {
      setToast({ variant: "success", title: "", description: "" });
    }, 4000);
  }, [toast, setToast]);

  if (toast.title === "") {
    return;
  }

  return (
    <div
      className="toast"
      style={{
        backgroundColor:
          toast.variant === "success" ? "var(--success)" : "var(--error)",
      }}
    >
      <button
        className="toast__close-button"
        onClick={() =>
          setToast({ variant: "success", title: "", description: "" })
        }
      >
        <X size={24} />
      </button>

      {toast.variant === "success" ? (
        <Check size={32} />
      ) : (
        <Warning size={32} />
      )}

      <div className="toast__text-container">
        <span className="toast__text-container__title">{toast.title}</span>

        <span className="toast__text-container__description">
          {toast.description}
        </span>
      </div>

      <div className="toast__count-down-bar"></div>
    </div>
  );
};

export { Toast };
