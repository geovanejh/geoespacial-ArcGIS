import { Logo } from "./Logo/Logo";
import { HeaderContainer, IconWrapper } from "./styles";
import { LuFilter } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import Codex_Logo from "../../assets/Codex_Logo.svg";
import { SearchModal } from "../Modal/SearchModal";
import { useState } from "react";
import { useMap } from "../../contexts/MapContext";

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state, dispatch } = useMap();

  const buscaBairroHandler = async () => {
    if (!state.viewRef || !state.bairrosLayerRef) return;

    try {
      const query = state.bairrosLayerRef.createQuery();
      query.where = `bairro = '${state.search.toUpperCase()}'`;
      query.outFields = ["*"];
      query.returnGeometry = true;

      const result = await state.bairrosLayerRef.queryFeatures(query);

      if (result.features.length > 0) {
        const feature = result.features[0];
        dispatch({ type: "SET_SELECTED_BAIRRO", payload: feature.attributes });

        await state.viewRef.goTo({ target: feature.geometry, zoom: 15 });
      } else {
        dispatch({ type: "SET_SELECTED_BAIRRO", payload: null });
        alert(`Bairro "${state.search}" não encontrado`);
      }
    } catch (error) {
      console.error("Error querying bairro:", error);
      dispatch({ type: "SET_SELECTED_BAIRRO", payload: null });
      alert("Erro ao buscar o bairro");
    }
  };

  return (
    <>
      <HeaderContainer>
        <h1>Arcgis Dev</h1>
        <Logo src={Codex_Logo} />
        <IconWrapper>
          <LuFilter onClick={() => setIsModalOpen(true)} />
          <IoMdMenu />
        </IconWrapper>
      </HeaderContainer>
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buscaBairro={buscaBairroHandler}
      />
    </>
  );
};
