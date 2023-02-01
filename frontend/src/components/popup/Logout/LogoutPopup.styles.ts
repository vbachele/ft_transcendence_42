import styled from "styled-components";

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.56);
`;

export const Overlay__Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  background: rgba(0, 0, 0, 0.56);
  border-radius: 8px;
  backdrop-filter: blur(15px);
  margin: auto;
  position: relative;
  width: 375px;
  height: 189px;
  padding: 24px;
  gap: 24px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0px;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  flex: none;
  align-self: stretch;
`;

export const ButtonText = styled.div`
  display: "flex"
  align-items: center;
  justify-content: center;
  
`;
