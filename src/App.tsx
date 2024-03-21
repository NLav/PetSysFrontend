import { DarkModeContext } from "contexts";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles";

const App = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export { App };
