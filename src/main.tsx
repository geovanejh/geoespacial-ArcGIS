import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
