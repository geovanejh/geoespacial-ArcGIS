import { JSX } from "react/jsx-runtime";
import { Home } from "../../pages/Home";

export interface AppRoute {
  path: string;
  element: JSX.Element;
}

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <Home />,
  },
];
