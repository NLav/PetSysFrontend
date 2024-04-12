import { Moon, Sun } from "@phosphor-icons/react";
import { Toggle } from "components";
import { DarkModeContext } from "contexts";
import { useContext } from "react";
import * as S from "./ToggleDarkMode.styles";

interface IToggleDarkMode {
  iconsOutside?: boolean;
}

const ToggleDarkMode = ({ iconsOutside = true }: IToggleDarkMode) => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  return (
    <S.Container>
      <Toggle
        id="dark-mode-toggle"
        leftSideSibling={iconsOutside && <Sun size={32} />}
        rightSideSibling={iconsOutside && <Moon size={32} />}
        insideLeftIcon={!iconsOutside && <Moon size={24} />}
        insideRightIcon={!iconsOutside && <Sun size={24} />}
        defaultChecked={isDarkMode}
        onChange={(event) => {
          setIsDarkMode(event.target.checked);
        }}
      />
    </S.Container>
  );
};

export { ToggleDarkMode };
