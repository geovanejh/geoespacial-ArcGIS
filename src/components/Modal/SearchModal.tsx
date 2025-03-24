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
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  buscaBairro: () => Promise<void>;
}

export const SearchModal = ({
  isOpen,
  onClose,
  search,
  setSearch,
  buscaBairro,
}: SearchModalProps) => {
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Buscar</SearchButton>
      </ModalContent>
    </ModalOverlay>
  );
};
