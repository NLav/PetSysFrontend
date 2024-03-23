import { Moon, Sun } from "@phosphor-icons/react";
import { Toggle } from "components";
import { DarkModeContext } from "contexts";
import { useContext } from "react";
import * as S from "./ToggleDarkMode.styles";

interface IToggleDarkMode {
  showIcons?: boolean;
}

const ToggleDarkMode = ({ showIcons = true }: IToggleDarkMode) => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  return (
    <S.Container>
      <Toggle
        id="dark-mode-toggle"
        leftSideSibling={showIcons && <Sun size={32} />}
        rightSideSibling={showIcons && <Moon size={32} />}
        defaultChecked={isDarkMode}
        onChange={(event) => {
          setIsDarkMode(event.target.checked);
        }}
      />
    </S.Container>
  );
};

export { ToggleDarkMode };
