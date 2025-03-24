import { Route, Routes } from "react-router-dom";
import { routes } from "./config/routes";

export const Router = () => {
  return (
    <div className="container">
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};
