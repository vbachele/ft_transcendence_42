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
  height: 85vh;
  ::before {
    content: "";
    position: absolute; /* position the pseudo-element */
    top: 0;
    left: 0;
    width: 100%;
    height: 85vh;
    background-image: url("https://cdn.discordapp.com/attachments/1067488107827576916/1080769554302652416/Capture_decran_2023-03-02_a_09.31.57.png");
    background-size: cover;
    background-position: center;
    filter: brightness(0.3) blur(25px); /* add the blur effect to the image */
    z-index: -1; /* set the pseudo-element behind the container */
  }
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
