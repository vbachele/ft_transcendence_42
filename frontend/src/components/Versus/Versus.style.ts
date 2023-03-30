import styled, {keyframes} from 'styled-components';

export const openCurtainAnimation = keyframes`
  0% {
    grid-gap: 0;
  }
  100% {
    grid-gap: 100vw;
  }
`;

export const closeCurtainAnimation = keyframes`
  0% {
    grid-gap: 100vw;
  }
  100% {
    grid-gap: 0;
  }
`;

export const sides = styled.div`
	display: grid;
	grid-template-columns: 50vw 50vw;
	&.open {
		animation: 2s ${openCurtainAnimation} cubic-bezier(0.86, 0, 0.07, 1) 0s
			both;
	}
	&.close {
		animation: 2s ${closeCurtainAnimation} cubic-bezier(0.86, 0, 0.07, 1) 0s
			both;
	}
`;

export const intro = styled.div`
	position: fixed;
	z-index: 1000;
	inset: 0;
	height: 100%;
	overflow: hidden;
	display: flex;

	justify-content: center;
`;

export const playerImage = styled.img`
	font-size: 3em;
	height: clamp(100px, 40vw, 500px);
`;

export const playerName = styled.div`
	margin: 0.3em;
`;

export const versusCircle = styled.div`
	position: absolute;
	width: 8vw;
	height: 8vw;
	background: #ffffff;
	border-radius: 50%;
	inset: 0;
	margin: auto;
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 3.4vw;
	font-weight: 700;
	color: #202020;
	border-width: 10px;
	border-style: solid;
	border-color: #fafafa #fafafa #202020 #202020;
	transform: rotate(45deg);

	&.span {
		transform: rotate(0);
	}
`;

export const side = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 7vw;
	font-weight: 700;

	&.firstPlayer {
		background-color: #fafafa;
		color: #202020;
	}

	&.secondPlayer {
		background-color: #202020;
		color: #ffffff;
		flex-direction: column-reverse;
	}
`;
