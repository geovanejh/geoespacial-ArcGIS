import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand";
import Legend from "@arcgis/core/widgets/Legend";
import { MapContainer } from "./styles";

interface BairroAttributes {
  objectid: number;
  bairro: string;
}

interface MapComponentProps {
  setViewRef: (view: MapView) => void;
  setBairrosLayerRef: (layer: FeatureLayer) => void;
  selectedBairro: BairroAttributes | null;
  setSelectedBairro: (bairro: BairroAttributes | null) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  setViewRef,
  setBairrosLayerRef,
  selectedBairro,
  setSelectedBairro,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);

  useEffect(() => {
    esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

    const webMap = new WebMap({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: mapRef.current as HTMLDivElement,
      map: webMap,
      center: [-51.2177, -30.0346],
      zoom: 12,
    });

    const bairrosLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/4",
      title: "Bairros",
      opacity: 1,
      visible: true,
      outFields: ["bairro"],
      popupTemplate: {
        title: "Bairro: {bairro}",
        outFields: ["bairro"],
      },
    });

    const eixosLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/2",
      title: "Eixos",
      opacity: 0.7,
      visible: true,
    });

    const regioesPlanejamentoLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/3",
      title: "Regiões de Planejamento",
      opacity: 1,
      visible: true,
    });

    const pontosCotadosLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/1",
      title: "Pontos Cotados",
      opacity: 0.5,
      visible: true,
    });

    webMap.addMany([
      pontosCotadosLayer,
      eixosLayer,
      regioesPlanejamentoLayer,
      bairrosLayer,
    ]);

    setBairrosLayerRef(bairrosLayer);

    viewRef.current = view;
    setViewRef(view);

    view.on("click", (event: any) => {
      view.hitTest(event).then((response: any) => {
        const bairroGraphic = response.results.find(
          (result: any) =>
            result.graphic && result.graphic.layer === bairrosLayer
        )?.graphic;

        if (bairroGraphic) {
          setSelectedBairro(bairroGraphic.attributes);
        } else {
          setSelectedBairro(null);
        }
      });
    });

    const layerList = new LayerList({
      view: view,
    });

    view.ui.add(
      new Expand({
        content: layerList,
        view: view,
        group: "top-left",
      }),

      "top-left"
    );

    const legend = new Legend({
      view: view,
    });
    view.ui.add(legend, "bottom-left");

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  return (
    <MapContainer>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "94vh",
        }}
      />
      {selectedBairro && (
        <div>
          <h3>Dados do bairro</h3>
          <p>
            <b>Id:</b> {selectedBairro.objectid}
          </p>
          <p>
            <b>Nome:</b> {selectedBairro.bairro}
          </p>
        </div>
      )}
    </MapContainer>
  );
};
