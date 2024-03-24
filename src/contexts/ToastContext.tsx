import { IToastProps } from "components/Toast";
import { createContext, useState } from "react";

interface IToastContext {
  toasts: IToastProps[];
  addToast: (toast: IToastProps) => void;
}

export const ToastContext = createContext<IToastContext>({
  toasts: [],
  addToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<IToastProps[]>([]);

  const addToast = (toast: IToastProps) => {
    setToasts((current) => [
      ...current,
      { ...toast, onClick: () => removeToast(toast.id) },
    ]);

    setTimeout(() => removeToast(toast.id), 4000);
  };

  const removeToast = (id: IToastProps["id"]) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastContext.Provider>
  );
};
