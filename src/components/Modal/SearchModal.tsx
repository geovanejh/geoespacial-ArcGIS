import {
  CloseButton,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  SearchButton,
  SearchInput,
} from "./styles";
import { useMap } from "../../contexts/MapContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  buscaBairro: () => Promise<void>;
}

export const SearchModal = ({
  isOpen,
  onClose,
  buscaBairro,
}: SearchModalProps) => {
  const { state, dispatch } = useMap();

  if (!isOpen) return null;

  const handleSearch = () => {
    console.log("executou");
    buscaBairro();
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Buscar Bairro</ModalTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
        <SearchInput
          placeholder="Nome do Bairro"
          type="text"
          value={state.search}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH", payload: e.target.value })
          }
        />
        <SearchButton onClick={handleSearch}>Buscar</SearchButton>
      </ModalContent>
    </ModalOverlay>
  );
};
