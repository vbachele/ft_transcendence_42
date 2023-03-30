import React from 'react';
import * as S from './Versus.style';
import {useGameContext} from '../../contexts/Game/context';

interface VersusProps {
	animation: 'close' | 'open';
}

function Versus({animation}: VersusProps) {
	const {leftPlayer, rightPlayer} = useGameContext().GameState;

	if (!leftPlayer || !rightPlayer) return null;

	return (
		<S.intro>
			<S.sides className={animation}>
				<S.side className={`side firstPlayer`}>
					<S.playerName>{leftPlayer.name}</S.playerName>
					<S.playerImage src={leftPlayer.image} className="emoji" />
				</S.side>
				<S.versusCircle className="versusCircle span">
					<span className="span">VS</span>
				</S.versusCircle>
				<S.side className={`side secondPlayer`}>
					<S.playerName>{rightPlayer.name}</S.playerName>
					<S.playerImage src={rightPlayer.image} className="emoji" />
				</S.side>
			</S.sides>
		</S.intro>
	);
}

export default Versus;
