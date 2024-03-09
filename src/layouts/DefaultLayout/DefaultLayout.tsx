import { Outlet } from "react-router-dom";
import "./DefaultLayout.scss";

const DefaultLayout = () => {
  return (
    <div className="default-layout">
      <h1>DefaultLayout</h1>
      <Outlet />
    </div>
  );
};

export { DefaultLayout };
