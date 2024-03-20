import { ToastProvider } from "contexts";
import { DefaultLayout } from "layouts";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "stores";
import { ThemeProvider } from "styled-components";
import { theme } from "styles";
import { Pets } from "views";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/pets",
        element: <Pets />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
