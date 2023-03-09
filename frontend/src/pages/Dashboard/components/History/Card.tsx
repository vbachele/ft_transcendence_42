import * as S from './History.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {ReactComponent as WinIcon} from '../../assets/win.svg';
import {ReactComponent as LossIcon} from '../../assets/loss.svg';

interface IMatch {
	user: string;
	myScore: number;
	userScore: number;
	id: number;
}

interface IProps {
	match: IMatch;
}

const Card = ({match}: IProps) => {
	const {data: user, isLoading, error} = useFetchUserByName(match.user);
	const result: string = match.myScore > match.userScore ? 'win' : 'loss';

	return (
		<S.CardContainer>
			{user && (
				<S.Card result={result}>
					<img src={user.image} />
					<F.H5>{user.name}</F.H5>
					<S.Result>
						<F.Text weight="500">
							{match.myScore}
							{' - '}
							{match.userScore}
						</F.Text>
					</S.Result>
				</S.Card>
			)}
			{user && (result === 'win' ? <WinIcon /> : <LossIcon />)}
		</S.CardContainer>
	);
};

export default Card;
