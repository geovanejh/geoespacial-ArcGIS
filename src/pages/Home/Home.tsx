import { useState, useRef, useCallback } from "react";
import { Header } from "../../components/Header/Header";
import { MapComponent } from "../../components/Map/MapComponent";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";

interface BairroAttributes {
  objectid: number;
  bairro: string;
}

export const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedBairro, setSelectedBairro] = useState<BairroAttributes | null>(
    null
  );
  const viewRef = useRef<MapView | null>(null);
  const bairrosLayerRef = useRef<FeatureLayer | null>(null);

  const buscaBairro = async () => {
    if (!search || !viewRef.current || !bairrosLayerRef.current) {
      return;
    }
    try {
      const query = bairrosLayerRef.current.createQuery();
      query.where = `bairro = '${search.toUpperCase()}'`;
      query.outFields = ["*"];
      query.returnGeometry = true;

      const result = await bairrosLayerRef.current.queryFeatures(query);

      if (result.features.length > 0) {
        const feature = result.features[0];
        setSelectedBairro(feature.attributes);

        if (viewRef.current && feature.geometry) {
          await viewRef.current.goTo({
            target: feature.geometry,
            zoom: 15,
          });

          const graphic = new Graphic({
            geometry: feature.geometry,
            attributes: feature.attributes,
            layer: bairrosLayerRef.current,
          });

          const centroid = (feature.geometry as Polygon).centroid;
          viewRef.current.openPopup({
            features: [graphic],
            location: centroid as Point,
          });
        }
      } else {
        setSelectedBairro(null);
        alert(`Bairro "${search}" não encontrado`);
      }
    } catch (error) {
      console.error("Error querying bairro:", error);
      setSelectedBairro(null);
      alert("Erro ao buscar o bairro");
    }
  };

  const handleSetViewRef = useCallback((view: MapView) => {
    viewRef.current = view;
  }, []);

  const handleSetBairrosLayerRef = useCallback((layer: FeatureLayer) => {
    bairrosLayerRef.current = layer;
  }, []);

  return (
    <>
      <Header setSearch={setSearch} search={search} buscaBairro={buscaBairro} />
      <MapComponent
        setViewRef={handleSetViewRef}
        setBairrosLayerRef={handleSetBairrosLayerRef}
        selectedBairro={selectedBairro}
        setSelectedBairro={setSelectedBairro}
      />
    </>
  );
};
