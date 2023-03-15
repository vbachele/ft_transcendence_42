import React, {Dispatch, SetStateAction, useContext} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../components/components.styles';
import * as C from '../containers/containers.styles';
import User from 'mocks/Users/players.json';
import ChatContext from '../../../contexts/Chat/chat.context';
import {useResponsiveLayout} from '../../../hooks/chat/useResponsiveLayout';
import Profile from '../assets/Profile';
import BurgerMenu from '../assets/BurgerMenu';

interface IProps {
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

const user = Array.from(User.players)[0];

function TopBar({setOpenUserPanel}: IProps) {
	const {responsive} = useResponsiveLayout();
	const updateActiveLobby = useContext(ChatContext).ChatDispatch;
	const {activeLobby} = useContext(ChatContext).ChatState;

	function clearActiveLobby() {
		updateActiveLobby({
			type: 'update_active_lobby',
			payload: undefined,
		});
	}

	if (activeLobby?.type === 'channel')
		return (
			<C.TopBar>
				<S.ChannelName>
					{responsive && (
						<button onClick={clearActiveLobby}>
							<BurgerMenu />
						</button>
					)}
					<F.Text weight="700">#{activeLobby?.name}</F.Text>
				</S.ChannelName>
			</C.TopBar>
		);
	else if (activeLobby?.type === 'direct_message')
		return (
			<C.TopBar>
				<S.ChannelName>
					{responsive && (
						<button onClick={clearActiveLobby}>
							<BurgerMenu />
						</button>
					)}
					<S.ProfilePic src={user.image} />
					<F.Text weight="700">{activeLobby?.name}</F.Text>
				</S.ChannelName>
				<button
					style={{
						backgroundColor: 'transparent',
						border: 'none',
						cursor: 'pointer',
					}}
					onClick={() => setOpenUserPanel(true)}
				>
					<Profile />
				</button>
			</C.TopBar>
		);
	else return null;
}

export default TopBar;
