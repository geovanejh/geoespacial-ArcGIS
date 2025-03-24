// /services/arcgisService.ts
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";

export const initializeMap = (container: HTMLDivElement) => {
  esriConfig.apiKey = "SUA_CHAVE_API";

  const bairrosLayer = new FeatureLayer({
    url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/4",
    title: "Bairros",
    opacity: 0.8,
    visible: true,
    outFields: ["bairro"],
    popupTemplate: { title: "Bairro: {bairro}", outFields: ["bairro"] },
  });

  const webMap = new WebMap({ basemap: "topo-vector" });
  const view = new MapView({
    container,
    map: webMap,
    center: [-51.2177, -30.0346],
    zoom: 12,
  });

  webMap.add(bairrosLayer);

  return { view, bairrosLayer };
};

export const buscaBairro = async (
  search: string,
  view: MapView,
  bairrosLayer: FeatureLayer,
  setSelectedBairro: (bairro: any) => void
) => {
  if (!search) return;

  try {
    const query = bairrosLayer.createQuery();
    query.where = `bairro = '${search.toUpperCase()}'`;
    query.outFields = ["*"];
    query.returnGeometry = true;

    const result = await bairrosLayer.queryFeatures(query);

    if (result.features.length > 0) {
      const feature = result.features[0];
      setSelectedBairro(feature.attributes);

      await view.goTo({ target: feature.geometry, zoom: 15 });

      const graphic = new Graphic({
        geometry: feature.geometry,
        attributes: feature.attributes,
        layer: bairrosLayer,
      });

      const centroid = (feature.geometry as Polygon).centroid;
      view.openPopup({ features: [graphic], location: centroid as Point });
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
