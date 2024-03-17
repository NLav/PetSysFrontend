import { createContext, useState } from "react";

interface IToastProps {
  variant: "success" | "danger";
  title: string;
  description: string;
}

interface IToastContext {
  toast: IToastProps;
  setToast: React.Dispatch<React.SetStateAction<IToastProps>>;
}

export const ToastContext = createContext<IToastContext>({
  toast: { variant: "success", title: "", description: "" },
  setToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<IToastProps>({
    variant: "success",
    title: "",
    description: "",
  });

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};
