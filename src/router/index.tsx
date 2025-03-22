import { Route, Routes } from "react-router-dom";
import { routes } from "./config/routes";
import { Header } from "../components/Header/Header";

export const Router = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};
