import styled from "styled-components";

export const MapContainer = styled.div`
  height: 94vh;
  width: 100%;

  display: flex;

  > div:nth-child(2) {
    position: absolute;
    right: 0;
    width: 320px;
    background-color: #fff;
    height: 94vh;
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.1s ease-out;

    @keyframes slideIn {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    > p {
      margin: 0;
    }

    h3 {
      margin-bottom: 12px;
    }
  }
`;
