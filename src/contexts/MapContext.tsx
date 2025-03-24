import { createContext, useContext, useReducer, ReactNode } from "react";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface BairroAttributes {
  objectid: number;
  bairro: string;
  [key: string]: any;
}

interface MapState {
  search: string;
  selectedBairro: BairroAttributes | null;
  viewRef: MapView | null;
  bairrosLayerRef: FeatureLayer | null;
}

type MapAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SELECTED_BAIRRO"; payload: BairroAttributes | null }
  | { type: "SET_VIEW_REF"; payload: MapView | null }
  | { type: "SET_BAIRROS_LAYER_REF"; payload: FeatureLayer | null };

const MapContext = createContext<
  | {
      state: MapState;
      dispatch: React.Dispatch<MapAction>;
    }
  | undefined
>(undefined);

const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SELECTED_BAIRRO":
      return { ...state, selectedBairro: action.payload };
    case "SET_VIEW_REF":
      return { ...state, viewRef: action.payload };
    case "SET_BAIRROS_LAYER_REF":
      return { ...state, bairrosLayerRef: action.payload };
    default:
      return state;
  }
};

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mapReducer, {
    search: "",
    selectedBairro: null,
    viewRef: null,
    bairrosLayerRef: null,
  });

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMap must be used within a MapProvider");
  return context;
};
