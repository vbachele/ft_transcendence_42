import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: clamp(60vw, 394px, 50vw);
  margin-top: 6vh;
  gap: 20px;
  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
`;

export const Container__Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0rem, 2vh, 0.5rem);
`;

export const Container__Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: clamp(4rem, 2vh, 8rem);

  @media only screen and (max-width: 768px) {
    align-items: left;
  }
`;
