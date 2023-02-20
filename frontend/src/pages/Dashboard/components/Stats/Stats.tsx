import {ReactComponent as ScoreIcon} from '../../assets/score.svg';
import {ReactComponent as GamesIcon} from '../../assets/games.svg';
import {ReactComponent as RatioIcon} from '../../assets/ratio.svg';
import {IUser} from 'types/models';
import * as S from './Stats.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';

interface IProps {
	user: IUser;
}

const Stats = ({user}: IProps) => {
	return (
		<S.Stats>
			<S.Card>
				<ScoreIcon />
				<S.VDiv>
					<F.Subtitle>Score</F.Subtitle>
					<F.H3>{user.score}</F.H3>
				</S.VDiv>
			</S.Card>

			<S.Card>
				<GamesIcon />
				<S.VDiv>
					<F.Subtitle>Games</F.Subtitle>
					<F.H3>{user.games}</F.H3>
				</S.VDiv>
			</S.Card>

			<S.Card>
				<RatioIcon />
				<S.VDiv>
					<F.Subtitle>Wins</F.Subtitle>
					<F.H3>{user.wins}</F.H3>
					<S.StyledProgress
						percent={Math.round(user.ratio * 100)}
						format={(percent) => `${percent} % Ratio`}
					/>
				</S.VDiv>
			</S.Card>
		</S.Stats>
	);
};

export default Stats;
