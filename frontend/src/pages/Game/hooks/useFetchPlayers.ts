import {backend} from '../../../lib/backend';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {IUser} from '../../../types/models';

export function useFetchPlayers() {
	const [SearchParams] = useSearchParams();
	const [leftPlayer, setLeftPlayer] = useState<IUser | null>(null);
	const [rightPlayer, setRightPlayer] = useState<IUser | null>(null);

	useLayoutEffect(() => {
		const leftPlayerName = SearchParams.get('leftPlayer');
		const rightPlayerName = SearchParams.get('rightPlayer');

		if (!leftPlayerName || !rightPlayerName) return;

		const fetchPlayers = async () => {
			const player1 = await backend.getUser(leftPlayerName);
			const player2 = await backend.getUser(rightPlayerName);
			setLeftPlayer(player1);
			setRightPlayer(player2);
		};
		fetchPlayers();
	}, []);

	return {leftPlayer, rightPlayer};
}
