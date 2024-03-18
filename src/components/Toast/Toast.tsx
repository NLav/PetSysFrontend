import { Check, Warning } from "@phosphor-icons/react";
import { ToastContext } from "contexts";
import { useContext, useEffect, useState } from "react";
import "./Toast.scss";

interface IToastProps {
  variant: "success" | "danger";
  title: string;
  description: string;
}

const Toast = ({ title, description, variant }: IToastProps) => {
  const [showToast, setShowToast] = useState(false);

  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    setShowToast(true);

    setTimeout(() => {
      setToast({ variant: "success", title: "", description: "" });

      setShowToast(false);
    }, 4000);
  }, [title, setToast]);

  if (!showToast || title === "") {
    return;
  }

  return (
    <div
      className="toast"
      style={{
        backgroundColor:
          variant === "success" ? "var(--success)" : "var(--error)",
      }}
    >
      {variant === "success" ? <Check size={32} /> : <Warning size={32} />}

      <div className="toast__text">
        <span className="toast__text__title">{title}</span>

        <span className="toast__text__description">{description}</span>
      </div>
    </div>
  );
};

export { Toast };
