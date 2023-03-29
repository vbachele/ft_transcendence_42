import styled, { keyframes } from 'styled-components';

export const curtainAnimation = keyframes`
  0% {
    grid-gap: 100vw;
  }

  100% {
    grid-gap: 0;
  }
`;


export const sides = styled.div`
  animation: 0.7s ${curtainAnimation} cubic-bezier(.86,0,.07,1) 0.4s both;
  display: grid;
  grid-template-columns: 50vw 50vw;
`;

export const intro = styled.div`
height: 100%;
  overflow: hidden;
  display: flex;

  justify-content: center;
`

export const playerImage = styled.img`
    font-size: 3em;
    height: clamp(100px, 40vw, 500px);
`

export const playerName = styled.div`
 margin: 0.3em;
`

export const versusCircle = styled.div `
 position: absolute;
  width: 8vw;
  height: 8vw;
  background: #ffffff;
  border-radius: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.4vw;
  font-weight:700;
  color: #202020;
  border-width: 10px;
  border-style: solid;
  border-color: #202020 #fafafa #fafafa #202020;
  transform: rotate(-45deg);

  &.span{
    transform: rotate(45deg);
  }
`

export const side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 7vw;
  font-weight:700;

  &.firstPlayer {
    background-color: #fafafa;
    color: #202020;
  }

  &.secondPlayer{
  background-color: #202020;
  color: #ffffff;
  flex-direction: column-reverse;
}
`;