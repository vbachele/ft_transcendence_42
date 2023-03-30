import useFetchUserByName from 'hooks/useFetchUserByName';
import {ReactComponent as WinIcon} from '../../assets/win.svg';
import {ReactComponent as LossIcon} from '../../assets/loss.svg';
import {ReactComponent as DrawIcon} from '../../assets/draw.svg';
import {IGame, IUser} from 'types/models';
import {formatDistanceToNowStrict} from 'date-fns';
import {useUserInfos} from 'contexts/User/userContent';
import * as S from './History.styles';
import * as F from 'styles/font.styles';

interface IProps {
	user: IUser;
	match: IGame;
}

const Card = ({user, match}: IProps) => {
	const date = new Date(match.createdAt);
	const formattedDate = formatDistanceToNowStrict(date, {
		addSuffix: true,
	});

	const isLeftPlayer = match.leftPlayerName === user.name;
	const opponentName = isLeftPlayer
		? match.rightPlayerName
		: match.leftPlayerName;
	const opponentScore = isLeftPlayer ? match.rightScore : match.leftScore;
	const userScore = isLeftPlayer ? match.leftScore : match.rightScore;
	const result =
		userScore > opponentScore
			? 'win'
			: userScore < opponentScore
			? 'loss'
			: 'draw';

	const {data: opponent} = useFetchUserByName(opponentName);

	return (
		<S.CardContainer>
			{opponent && (
				<S.Card to={`/dashboard/${opponentName}`} result={result}>
					<img src={opponent?.image} />
					<F.H5>{opponentName}</F.H5>
					<S.Result>
						<F.H4>
							{userScore}
							{' - '}
							{opponentScore}
						</F.H4>
					</S.Result>
					<F.Subtitle>{formattedDate}</F.Subtitle>
				</S.Card>
			)}
			{opponent &&
				(result === 'win' ? (
					<WinIcon />
				) : result === 'loss' ? (
					<LossIcon />
				) : (
					<DrawIcon />
				))}
		</S.CardContainer>
	);
};

export default Card;
