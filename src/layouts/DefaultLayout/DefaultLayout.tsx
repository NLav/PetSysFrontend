import { Menu } from "components";
import { Outlet } from "react-router-dom";
import "./DefaultLayout.scss";

const DefaultLayout = () => {
  return (
    <div className="default-layout">
      <div className="default-layout__menu-container">
        <Menu />
      </div>

      <div className="default-layout__content-container">
        <Outlet />
      </div>
    </div>
  );
};

export { DefaultLayout };
