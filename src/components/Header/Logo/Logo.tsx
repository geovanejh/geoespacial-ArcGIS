import { StyledLogo } from "./styles";

interface LogoProps {
  src: string;
}

export const Logo = ({ src }: LogoProps) => {
  return <StyledLogo src={src} alt="Logo" />;
};
