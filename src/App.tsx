import { ToastProvider } from "contexts";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import { store } from "stores";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles";
import { useDarkMode } from "usehooks-ts";

const App = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <Provider store={store}>
      <ToastProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ToastProvider>
    </Provider>
  );
};

export { App };
