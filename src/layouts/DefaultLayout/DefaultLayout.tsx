import { Menu, Toast } from "components";
import { ToastContext } from "contexts";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./DefaultLayout.scss";

const DefaultLayout = () => {
  const { toast } = useContext(ToastContext);

  return (
    <div className="default-layout">
      <div className="default-layout__menu-container">
        <Menu />
      </div>

      <div className="default-layout__content-container">
        <Outlet />
      </div>

      <Toast
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
      />
    </div>
  );
};

export { DefaultLayout };
