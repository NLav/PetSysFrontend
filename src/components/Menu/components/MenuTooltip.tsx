import { useState } from "react";
import "./MenuTooltip.scss";

interface IPopoverProps {
  text: string;
  children: React.ReactElement;
}

const MenuTooltip = ({ text, children }: IPopoverProps) => {
  const [showText, setShowText] = useState(false);

  return (
    <div
      className="menu-tooltip"
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      {children}

      {showText ? (
        <>
          <div className="menu-tooltip__text">{text}</div>

          <span className="menu-tooltip__arrow"></span>
        </>
      ) : null}
    </div>
  );
};

export { MenuTooltip };
