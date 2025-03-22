import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #1a1a1a;
  align-items: center;
  padding: 12px 24px;

  > h1 {
    color: #ffff;
    font-weight: 400;
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
