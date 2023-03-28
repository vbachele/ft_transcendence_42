import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './invite.svg';
import {ClientEvents, ServerEvents} from 'events/socket.events';
import {useContext, useState} from 'react';
import SocketContext from 'contexts/Socket/context';
import {ClientGameEvents} from 'events/game.events';
import {usePopup} from 'contexts/Popup/Popup';
import * as S from 'pages/Home/Home.styles';
import {GameMode} from 'pages/Game/types/game.type';
import styled from 'styled-components';

const StyleInvite = styled.div`
	display: flex;
	flex-direction: row;
	gap: 16px;
	margin: 0 0 -16px 0;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Button = styled.button`
	font-size: 16px;
`;

interface IProps {
	name: string;
}

function Invite({name}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {setHasInvited} = usePopup();
	const [showGameModes, setShowGameModes] = useState(false);

	function onInvite(mode: GameMode) {
		socket?.emit(ClientEvents.CreateLobby, {
			type: 'game',
			data: {
				mode: mode,
			},
		});
		socket?.on(ServerEvents.LobbyMessage, (data) => {
			if (data.message === 'Lobby created') {
				setHasInvited(true);
				console.info(`Sending invitation request`);
				socket?.emit(ClientGameEvents.Invite, {
					lobbyId: data.lobbyId,
					invitedClientName: name,
				});
			}
		});
	}

	function onPlay() {
		setShowGameModes(true);
	}

	function offPlay() {
		setShowGameModes(false);
	}

	function onPlayAgainstTheClock() {
		onInvite(GameMode.AgainstTheClock);
	}

	function onPlayScoreLimit() {
		onInvite(GameMode.ScoreLimit);
	}

	return (
		<StyleInvite onMouseEnter={onPlay} onMouseLeave={offPlay}>
			<Icon />
			<Content>
				<Button onClick={() => setShowGameModes(!showGameModes)}>
					<F.Text>Invite to play</F.Text>
				</Button>
				<S.GameMode
					className={showGameModes ? 'active' : ''}
					style={{margin: '0', gap: '8px'}}
				>
					<Button onClick={onPlayAgainstTheClock}>Against the clock</Button>
					<Button onClick={onPlayScoreLimit}>Score limit</Button>
				</S.GameMode>
			</Content>
		</StyleInvite>
	);
}

export default Invite;
