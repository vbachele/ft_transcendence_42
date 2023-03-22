import React, {useContext, useEffect, useState} from 'react';
import {PopupButton} from 'styles/buttons.styles';
import {Text} from 'styles/font.styles';
import PopupContext from 'contexts/Popup/Popup';
import GameFound from '../components/GameFound/GameFound';
import Timer from '../components/SearchTimer/InviteTimer';
import Popup from '../components/Popup/Popup';
import FireGif from '../components/FireGif/FireGif';
import SocketContext from '../../../contexts/Socket/context';
import {ServerGameEvents} from '../../../events/game.events';
import {createSearchParams, useNavigate} from 'react-router-dom';

// BACKEND : Ajouter que lorsque play on a le statut red
// BACKEND : Ajouter le statut : recherche une partie
// BACKEND : ajouter condition when game is found

function SearchPlayer({}) {
	const {popup, setPopup} = useContext(PopupContext);
	const [showComponent, setShowComponent] = useState(false);
	const {socket} = useContext(SocketContext).SocketState;
	const navigate = useNavigate();

	useEffect(() => {
		socket?.on(ServerGameEvents.GameFound, (data) => {
			console.log(`game found`, data);
			setPopup({toggle: false});
			navigate({
				pathname: '/game',
				search: createSearchParams({
					lobbyId: data.lobbyId,
				}).toString(),
			});
		});
		return () => {
			socket?.off(ServerGameEvents.GameFound);
		}
	}, [socket]);

	return popup.toggle ? (
		<Popup
			title="Waiting for players"
			headerImage={<FireGif />}
			loadingBar={<Timer />}
			style={{
				width: '300px',
				cursor: 'move',
			}}
			draggable={true}
		>
			<PopupButton
				onClick={() => setPopup({toggle: false})}
				border="1px solid #e5e7eb"
				className="Cancel"
				width="50%"
			>
				<Text weight="500">Cancel</Text>
			</PopupButton>
		</Popup>
	) : // {/* {showComponent ? <GameFound /> : ""} */}
	null;
}

export default SearchPlayer;
