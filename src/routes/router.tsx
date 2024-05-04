import { DefaultLayout, LoginLayout } from "layouts";
import { createBrowserRouter } from "react-router-dom";
import { Employees, Login, PetOwners, Pets } from "views";
import { NewUser } from "views/NewUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/pets",
        element: <Pets />,
      },
      {
        path: "/pet-owners",
        element: <PetOwners />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "new-user",
        element: <NewUser />,
      },
    ],
  },
]);
