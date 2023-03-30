import Card from './Card';
import {Empty} from 'antd';
import {useContext, useEffect, useState} from 'react';
import SocketContext from 'contexts/Socket/context';
import {IGame, IUser} from 'types/models';
import {ClientGameEvents} from 'events/game.events';
import * as S from './History.styles';
import * as F from 'styles/font.styles';
import {fetchBlocked} from 'helpers/fetchBlocked';
import {useUserInfos} from 'contexts/User/userContent';

interface IProps {
	user: IUser;
}

const History = ({user}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName} = useUserInfos();
	const [games, setGames] = useState<IGame[]>([]);

	useEffect(() => {
		if (socket) {
			socket?.emit(
				ClientGameEvents.FetchGames,
				{name: user.name},
				async (data: {games: IGame[]}) => {
					const filteredGames = await filterBlocked(data.games);
					setGames(filteredGames);
				}
			);
		}
	}, []);

	async function filterBlocked(games: IGame[]) {
		const blocked = await fetchBlocked(userName.userName);
		games.filter((game) => {
			return (
				!blocked?.some((user) => user.name === game.leftPlayerName) &&
				!blocked?.some((user) => user.name === game.rightPlayerName)
			);
		});
		games.reverse();
		games.splice(5);
		return games;
	}

	const isEmpty = games.length === 0;
	return (
		<S.Container>
			<F.Subtitle weight="700" fontSize="30px">
				Last Matches
			</F.Subtitle>
			<S.History empty={isEmpty}>
				{!isEmpty &&
					games.map((match: IGame) => (
						<Card user={user} match={match} key={match.id} />
					))}
				{isEmpty && <Empty className="empty" description="No matches played" />}
			</S.History>
		</S.Container>
	);
};

export default History;
