import styled, { keyframes } from "styled-components";

const zoom = keyframes`
  0% {
    color: #fff;
  }

  25% {
    opacity: 1;
    color: #fff;
  }
  40% {
    color: gold;
  }

  30% {
    transform: scale(0.75, 0.75);
  }

  75% {
    opacity: 1;
    color: gold;
  }

  100% {
    color: gold;
    transform: scale(0.65, 0.65);
  }
`;

const stutter = keyframes`
 0% {
    left: 0px;
    top: -10px;
    opacity: 1;
  }

  5% {
    left: 5px;
    top: -15px;
    opacity: 0;
  }

  10% {
    left: 10px;
    top: -15px;
    opacity: 1;
  }

  15% {
    left: 15px;
    top: -10px;
  }

  20% {
    left: 20px;
    top: -5px;
    opacity: 0;
  }

  25% {
    left: 20px;
    top: 0px;
    opacity: 1;
  }

  30% {
    left: 20px;
    top: 5px;
  }

  35% {
    left: 20px;
    top: 10px;
  }

  40% {
    left: 15px;
    top: 10px;
  }

  45% {
    left: 10px;
    top: 15px;
    opacity: 0;
  }

  50% {
    left: 5px;
    top: 15px;
    opacity: 1;
  }

  55% {
    left: 0px;
    top: 15px;
  }

  60% {
    left: -5px;
    top: 15px;
  }

  65% {
    left: -10px;
    top: 10px;
    opacity: 0;
  }

  70% {
    left: -15px;
    top: 5px;
    opacity: 1;
  }

  75% {
    left: -20px;
    top: 0px;
  }

  80% {
    left: -20px;
    top: -5px;
  }

  85% {
    left: -15px;
    top: 0px;
    opacity: 0;
  }

  90% {
    left: -10px;
    top: -5px;
    opacity: 1;
  }

  95% {
    left: -5px;
    top: -5px;
  }

  100% {
    left: 0px;
    top: -15px;
    opacity: 0;
  }
`;

export const Text = styled.div`
  font-size: clamp(100px, 30vw, 300px);
  font-weight: 600;
  color: #fff;
  text-shadow: 0px 0px 3px #cecece;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  display: none;
  span {
    position: absolute;
    -webkit-text-stroke-width: 15px;
    -webkit-text-stroke-color: gold;
    top: 0;
    left: 0;
    z-index: -1;
    color: gold;
    opacity: 0;
  }
  &.animate {
    display: block;
    animation: ${zoom} 4s cubic-bezier(0.21, 0.41, 0.42, 0.43) forwards;
    span {
      animation: ${stutter} 0.4s 2 0.5s;
    }
  }
`;

export const Wrapper = styled.div`
  background-color: #171717;
	position: absolute;
	inset: 0;
  display: flex;
	z-index: 500;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
