import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand";
import Legend from "@arcgis/core/widgets/Legend";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point"; // Added for explicit typing
import { MapContainer } from "./styles";

export const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);
  const [selectedBairro, setSelectedBairro] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const bairrosLayerRef = useRef<FeatureLayer | null>(null);

  useEffect(() => {
    esriConfig.apiKey =
      "AAPTxy8BH1VEsoebNVZXo8HurJY6VTF_viJ_iSXfeA36yKs-wnwh0SspUSqO5cm_eFL_SudFI8S4xt68rdy3RVQdeB4KIgvbjntS6eglP8oOxzAr9jrrvP2decAY4v6GPot2Iw9TG_yvjQlUd7_xVqUVT1e-_5lFe4KdcZRsBdqxsjJLEuhlrYXgvwt869obxTGkg07NFKR3S6BaPNOnsgHuaWBRcguWKu-P1HoDHgaSJng.AT1_SHz0yMCF";

    const bairrosLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/4",
      title: "Bairros",
      opacity: 0.8,
      visible: true,
      outFields: ["bairro"],
      popupTemplate: {
        title: "Bairro: {bairro}",
        outFields: ["bairro"],
      },
    });

    bairrosLayerRef.current = bairrosLayer;

    const eixosLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/2",
      title: "Eixos",
      opacity: 0.6,
      visible: true,
    });

    const regioesPlanejamentoLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/3",
      title: "Regiões de Planejamento",
      opacity: 0.5,
      visible: true,
    });

    const pontosCotadosLayer = new FeatureLayer({
      url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/1",
      title: "Pontos Cotados",
      opacity: 0.7,
      visible: true,
    });

    const webMap = new WebMap({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: mapRef.current as HTMLDivElement,
      map: webMap,
      center: [-51.2177, -30.0346],
      zoom: 12,
    });

    view
      .when(() => {
        viewRef.current = view;
      })
      .catch((error) => {
        console.error("Error initializing MapView:", error);
      });

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

    webMap.addMany([
      pontosCotadosLayer,
      eixosLayer,
      regioesPlanejamentoLayer,
      bairrosLayer,
    ]);

    const layerList = new LayerList({
      view: view,
    });

    const legend = new Legend({
      view: view,
    });

    view.ui.add(
      [
        new Expand({
          content: layerList,
          view: view,
          group: "top-left",
        }),
      ],
      "top-left"
    );

    view.ui.add(legend, "bottom-left");

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, []);

  const buscaBairro = async (): Promise<void> => {
    if (!inputValue || !viewRef.current || !bairrosLayerRef.current) {
      return;
    }

    try {
      const query = bairrosLayerRef.current.createQuery();
      query.where = `bairro = '${inputValue.toUpperCase()}'`;
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
        alert(`Bairro "${inputValue}" não encontrado`);
      }
    } catch (error) {
      console.error("Error querying bairro:", error);
      setSelectedBairro(null);
      alert("Erro ao buscar o bairro");
    }
  };

  return (
    <>
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
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite o nome do bairro"
        />
        <button onClick={buscaBairro}>click</button>
      </div>
    </>
  );
};
