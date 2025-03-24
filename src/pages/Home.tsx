import { Header } from "../components/Header/Header";
import { MapComponent } from "../components/Map/MapComponent";
import { MapProvider } from "../contexts/MapContext";

export const Home = () => {
  return (
    <MapProvider>
      <Header />
      <MapComponent />
    </MapProvider>
  );
};
