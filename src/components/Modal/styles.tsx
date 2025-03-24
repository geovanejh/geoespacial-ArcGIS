import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  position: relative;
  z-index: 1001;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 16px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const SearchButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;
