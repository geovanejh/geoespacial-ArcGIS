import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #1a1a1a;
  align-items: center;
  height: 6vh;
  padding: 0 24px;

  > h1 {
    color: #ffff;
    font-weight: 400;
    margin: 0;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
  color: #ffffff;
  cursor: pointer;

  > svg {
    font-size: 20px;
    &:hover {
      color: #cccccc;
    }
  }
`;
