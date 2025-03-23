import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-layer-list";

import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);
