import * as S from './History.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {ReactComponent as WinIcon} from '../../assets/win.svg';
import {ReactComponent as LossIcon} from '../../assets/loss.svg';

interface IMatch {
	opponent: string;
	myScore: number;
	opponentScore: number;
	id: number;
}

interface IProps {
	match: IMatch;
}

const Card = ({match}: IProps) => {
	const {data: opponent, isLoading, error} = useFetchUserByName(match.opponent);
	const result: string = match.myScore > match.opponentScore ? 'win' : 'loss';

	return (
		<S.CardContainer>
			{opponent && (
				<S.Card result={result}>
					<img src={opponent.image} />
					<F.H4>{opponent.name}</F.H4>
					<F.H5>
						<S.Result>
							{match.myScore}
							{' - '}
							{match.opponentScore}
						</S.Result>
					</F.H5>
				</S.Card>
			)}
			{result === 'win' ? <WinIcon /> : <LossIcon />}
		</S.CardContainer>
	);
};

export default Card;
