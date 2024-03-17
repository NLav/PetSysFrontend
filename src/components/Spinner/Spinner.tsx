import { CircleNotch } from "@phosphor-icons/react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      <CircleNotch size={"20%"} />
    </div>
  );
};

export { Spinner };
