import styled from "styled-components";

export const Overlay = styled.div`
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.56);
  z-index: 100;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.56);
  border-radius: 8px;
  backdrop-filter: blur(15px);
  margin: auto;
  padding: 24px;
  gap: 24px;
  width: fit-content;
  width: clamp(80, 80%, 375px);
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 8px;
`;

export const GiFFire = styled.img`
  width: 40px;
  height: 50px;
`;
