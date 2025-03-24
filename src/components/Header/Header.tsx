// components/Header/Header.jsx
import { Logo } from "./Logo/Logo";
import { HeaderContainer, IconWrapper } from "./styles";
import { LuFilter } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import Codex_Logo from "../../assets/Codex_Logo.svg";
import { SearchModal } from "../Modal/SearchModal";
import { useState } from "react";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
