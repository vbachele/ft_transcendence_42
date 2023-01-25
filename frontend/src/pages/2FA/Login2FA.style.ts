import styled from "styled-components";

export const Container = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;

  width: 100vw;
  gap: 5em;
  text-align: center;
  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
  visibility: none;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 24px 0px;

    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;

export const Container__Text = styled.div``;
