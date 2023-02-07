import styled from "styled-components";

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 50;
  align-items: center;
  background: rgba(0, 0, 0, 0.56);
  border-radius: 8px;
  backdrop-filter: blur(15px);
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0%);
  width: clamp(80px, 80%, 375px);
  height: 240px;
  padding: 24px;
  gap: 24px;
  @media only screen and (max-width: 768px) {
    height: 180px;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 8px;
  padding: 0px;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  align-self: stretch;
`;

export const ButtonText = styled.div`
  display: "flex"
  align-items: center;
  justify-content: center;
  
`;

export const GiFFire = styled.img`
  width: 40px;
  height: 50px;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
