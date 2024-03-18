import { Menu, Toast } from "components";
import { ToastContext } from "contexts";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "stores/hooks";
import "./DefaultLayout.scss";

const DefaultLayout = () => {
  const { toast, setToast } = useContext(ToastContext);

  const { error: petsError } = useAppSelector((state) => state.pets);

  useEffect(() => {
    setToast({
      variant: "danger",
      title: petsError.petsPaginated?.statusCode || "",
      description: petsError.petsPaginated?.message || "Não informado",
    });
  }, [petsError, setToast]);

  return (
    <div className="default-layout">
      <div className="default-layout__menu-container">
        <Menu />
      </div>

      <div className="default-layout__content-container">
        <Outlet />
      </div>

      {toast.title !== "" && (
        <Toast
          variant={toast.variant}
          title={toast.title}
          description={toast.description}
        />
      )}
    </div>
  );
};

export { DefaultLayout };
