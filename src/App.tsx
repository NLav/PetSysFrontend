import { Toast } from "components";
import { DarkModeContext, ToastContext } from "contexts";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles";

const App = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { toasts } = useContext(ToastContext);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          id={toast.id}
          variant={toast.variant}
          title={toast.title}
          description={toast.description}
          index={index}
          onClick={toast.onClick}
        />
      ))}

      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export { App };
