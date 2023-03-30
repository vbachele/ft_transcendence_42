import {Avatar, Header, Name, ScoreContainer, Vs} from '../Game.styles';
import React from 'react';
import {IUser} from '../../../types/models';
import * as S from '../Game.styles';

interface ScoreProps {
	score: {left: number; right: number};
	leftPlayer: IUser;
	rightPlayer: IUser;
}

function Score({score, leftPlayer, rightPlayer}: ScoreProps) {
	return (
		<S.Header>
			<S.Avatar
				className={'left__player'}
				alt={'left player avatar'}
				src={leftPlayer?.image}
			/>
			<S.ScoreContainer>
				<S.Score>{score.left}</S.Score>
				<S.Name className={'left__player'}>{leftPlayer?.name}</S.Name>
			</S.ScoreContainer>
			<S.Vs>VS</S.Vs>
			<S.ScoreContainer>
				<S.Score>{score.right}</S.Score>
				<S.Name className={'right__player'}>{rightPlayer?.name}</S.Name>
			</S.ScoreContainer>
			<S.Avatar
				className={'right__player'}
				alt={'right player avatar'}
				src={rightPlayer?.image}
			/>
		</S.Header>
	)
}

export default Score;