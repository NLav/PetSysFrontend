import React from "react";
import "./ActionBar.scss";

interface IActionBarProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

const ActionBar = ({ title, children }: IActionBarProps) => {
  return (
    <div className="action-bar">
      <span className="action-bar__title">{title}</span>

      {children && (
        <div className="action-bar__children-container">{children}</div>
      )}
    </div>
  );
};

export { ActionBar };
