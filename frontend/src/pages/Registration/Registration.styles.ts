import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100vw;
  margin-top: 15vh;
  height: 85vh;
  ::before {
    content: "";
    position: absolute; /* position the pseudo-element */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://cdn.discordapp.com/attachments/1067488107827576916/1080769554302652416/Capture_decran_2023-03-02_a_09.31.57.png");
    background-size: cover;
    background-position: center;
    filter: brightness(0.3) blur(25px); /* add the blur effect to the image */
    z-index: -1; /* set the pseudo-element behind the container */
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 5em;
  gap: 3em;
`;
