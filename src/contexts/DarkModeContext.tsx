import { createContext, useEffect, useState } from "react";
import { LocalStorageService } from "services";

interface IDarkModeContext {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<IDarkModeContext>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    LocalStorageService.getDarkMode() === undefined
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : LocalStorageService.getDarkMode()
        ? true
        : false
  );

  useEffect(() => {
    LocalStorageService.setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
