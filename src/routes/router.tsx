import { DefaultLayout, LoginLayout } from "layouts";
import { createBrowserRouter } from "react-router-dom";
import { Login, NewUser, PetOwners, Pets, Users } from "views";

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
        path: "/users",
        element: <Users />,
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
