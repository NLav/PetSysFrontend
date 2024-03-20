import { DefaultLayout } from "layouts";
import { createBrowserRouter } from "react-router-dom";
import { Pets } from "views";

export const router = createBrowserRouter([
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
