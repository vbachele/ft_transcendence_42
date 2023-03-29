import Card from './Card';
import {Empty} from 'antd';
import {useContext, useEffect, useState} from 'react';
import SocketContext from 'contexts/Socket/context';
import {IGame, IUser} from 'types/models';
import {ClientGameEvents} from 'events/game.events';
import * as S from './History.styles';
import * as F from 'styles/font.styles';

interface IProps {
	user: IUser;
}

const History = ({user}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const [games, setGames] = useState<IGame[]>([]);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);

	useEffect(() => {
		console.log('user', user.name);
		if (socket) {
			socket?.emit(
				ClientGameEvents.FetchGames,
				{name: user.name},
				(data: {games: IGame[]}) => {
					setGames(data.games);
				}
			);
		}
	}, []);

	console.log(games);
	console.log(isEmpty);

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
