import {
  CloseButton,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  SearchButton,
  SearchInput,
} from "./styles";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Buscar bairro</ModalTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
        <SearchInput placeholder="Digite o nome do bairro" />
        <SearchButton>Buscar</SearchButton>
      </ModalContent>
    </ModalOverlay>
  );
};
