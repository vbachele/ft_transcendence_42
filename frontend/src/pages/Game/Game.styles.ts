import styled, {keyframes} from 'styled-components';
import Game from './Game';

export const StyledGame = styled.div`
	aspect-ratio: 16 / 9;
	max-height: 80vh;
	box-shadow: 0 0 10px 10px rgba(100, 100, 100, 0.8);
	margin: 32px auto;
`;

export const slideFromLeft = keyframes`
  0% {
		opacity: 1;
    transform: translateX(-100vw);
  }
	70% {
    opacity: 1;
		transform: translateX(30px) rotate(5deg);
	}
	80% {
    opacity: 1;
		transform: translateX(-10px) rotate(-5deg);
	}
	90% {
    opacity: 1;
		transform: translateX(5px) rotate(5deg);
	}
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;
export const slideFromRight = keyframes`
	0% {
    opacity: 1;
		transform: translateX(100vw);
  }
	70% {
    opacity: 1;
		transform: translateX(-30px);
  }
	80% {
    opacity: 1;
		transform: translateX(10px) rotate(-5deg);
  }
	90% {
    opacity: 1;
		transform: translateX(-5px) rotate(10deg);
  }
	100% {
    opacity: 1;
		transform: translateX(0);
  }
`;

export const slideFromTop = keyframes`
	0% {
		opacity: 1;
		transform: scale(100);
  }
	100% {
    opacity: 1;
		transform: scale(1);
  }
`;

export const rollFromLeft = keyframes`
	0% {
		opacity: 1;
		transform: translateX(-100vw) rotate(0deg);
  }
	100% {
    opacity: 1;
		transform: translateX(0) rotate(3600deg);
  }
`;

export const rollFromRight = keyframes`
	0% {
    opacity: 1;
		transform: translateX(100vw) rotate(0deg);
  }
	100% {
    opacity: 1;
		transform: translateX(0) rotate(-3600deg);
  }
`;

export const Name = styled.h1`
	transform-origin: center;
	width: 100%;
	height: 100%;
	font-size: calc(0.5rem + 1vw);
	opacity: 0;

	&.left__player {
		animation: 1s ease-out 2.5s 1 ${slideFromLeft};
		animation-fill-mode: forwards;
	}
	&.right__player {
		animation: 1s ease-out 2.5s 1 ${slideFromRight};
		animation-fill-mode: forwards;
	}
`;

export const Avatar = styled.img`
	transform-origin: center;
	border-radius: 50%;
	width: 100%;
	height: 100%;
	max-width: 64px;
	max-height: 64px;
	margin: 0 8px;
	opacity: 0;

	&.left__player {
		animation: 2s ease-out 3s 1 ${rollFromLeft};
		animation-fill-mode: forwards;
	}
	&.right__player {
		animation: 2s ease-out 3s 1 ${rollFromRight};
		animation-fill-mode: forwards;
	}
`;

export const Vs = styled.h3`
	opacity: 0;
	animation: 1s cubic-bezier(0.04, 1, 0.09, 1) 3s 1 ${slideFromTop};
	animation-fill-mode: forwards;
`;

export const Score = styled.h1`
	font-size: calc(1.5rem + 1vw);
`;

export const ScoreContainer = styled.div`
	display: flex;
	flex-basis: 10em;
	flex-direction: column;
`;

export const Header = styled.div`
	position: fixed;
	inset: auto 0;
	margin: 32px;
	display: flex;
	justify-content: center;
	gap: 12px;
	align-items: center;
	flex: 1;
	text-align: center;
`;
