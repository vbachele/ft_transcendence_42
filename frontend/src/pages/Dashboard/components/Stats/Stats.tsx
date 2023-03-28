import {ReactComponent as ScoreIcon} from '../../assets/score.svg';
import {ReactComponent as GamesIcon} from '../../assets/games.svg';
import {ReactComponent as RatioIcon} from '../../assets/ratio.svg';
import {IGame, IUser} from 'types/models';
import * as S from './Stats.styles';
import * as F from 'styles/font.styles';
import {ClientGameEvents} from 'events/game.events';
import {useContext, useEffect, useState} from 'react';
import SocketContext from 'contexts/Socket/context';
import {asyncEmit} from 'helpers/asyncEmit';

interface IProps {
	user: IUser;
}

const Stats = ({user}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const [games, setGames] = useState<IGame[]>([]);

	useEffect(() => {
		if (socket) {
			socket.emit(ClientGameEvents.FetchGames, (data: { games: IGame[] }) => {
				setGames(data.games);
			});
		}
	}, []);
	//calculate Score

	console.log(games.length);

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
						format={(percent) => `${percent} % Winrate`}
					/>
					<F.Subtitle className="ratio">
						{Math.round(user.ratio * 100)} % Winrate
					</F.Subtitle>
				</S.VDiv>
			</S.Card>
		</S.Stats>
	);
};

export default Stats;
