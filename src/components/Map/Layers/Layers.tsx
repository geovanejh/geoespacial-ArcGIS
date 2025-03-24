import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const bairrosLayer = new FeatureLayer({
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

export const eixosLayer = new FeatureLayer({
  url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/2",
  title: "Eixos",
  opacity: 0.6,
  visible: true,
});

export const regioesPlanejamentoLayer = new FeatureLayer({
  url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/3",
  title: "Regiões de Planejamento",
  opacity: 0.5,
  visible: true,
});

export const pontosCotadosLayer = new FeatureLayer({
  url: "https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/1",
  title: "Pontos Cotados",
  opacity: 0.7,
  visible: true,
});
