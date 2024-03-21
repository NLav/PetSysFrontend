import { createContext, useEffect, useState } from "react";
import { LocalStorageService } from "services";

interface ICollapseMenuContext {
  collapseMenu: boolean;
  setCollapseMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollapseMenuContext = createContext<ICollapseMenuContext>({
  collapseMenu: false,
  setCollapseMenu: () => {},
});

export const CollapseMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapseMenu, setCollapseMenu] = useState(
    LocalStorageService.getCollapseMenu() || false
  );

  useEffect(() => {
    LocalStorageService.setCollapseMenu(collapseMenu);
  }, [collapseMenu]);

  return (
    <CollapseMenuContext.Provider value={{ collapseMenu, setCollapseMenu }}>
      {children}
    </CollapseMenuContext.Provider>
  );
};
