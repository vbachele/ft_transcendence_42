import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

export function useSetupContext(canvas: HTMLCanvasElement | undefined) {
	const [searchParams] = useSearchParams();
	const [lobbyId, setLobbyId] = useState('');

	useEffect(() => {
		const lobbyId = searchParams.get('lobbyId');
		console.log(`lobbyId: ${lobbyId}`);
		setLobbyId(searchParams.get('lobbyId')!);
		if (canvas) {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}
	}, [canvas]);

	return {lobbyId};
}