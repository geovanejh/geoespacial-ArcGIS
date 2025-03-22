import { Logo } from "./Logo/Logo";
import { HeaderContainer, IconWrapper } from "./styles";
import { LuFilter } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import Codex_Logo from "../../assets/Codex_Logo.svg";

export const Header = () => {
  return (
    <HeaderContainer>
      <h1>Arcgis Dev</h1>
      <Logo src={Codex_Logo} />
      <IconWrapper>
        <LuFilter />
        <IoMdMenu />
      </IconWrapper>
    </HeaderContainer>
  );
};
