import { RefreshListingProvider, ToastProvider } from "contexts";
import { DefaultLayout } from "layouts";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Pets } from "views";
import "./index.scss";

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
    <RefreshListingProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </RefreshListingProvider>
  </React.StrictMode>
);
