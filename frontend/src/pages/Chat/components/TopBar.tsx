import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../components/components.styles';
import * as C from '../containers/containers.styles';
import User from 'mocks/Users/players.json';
import ChatContext from '../../../contexts/Chat/context';
import {useResponsiveLayout} from '../../../hooks/chat/useResponsiveLayout';
import Profile from '../assets/Profile';
import BurgerMenu from '../assets/BurgerMenu';
import {useUserInfos} from '../../../contexts/User/userContent';
import ModalUserSearch from '../modals/ModalUserSearch';
import {useFetchLobbyUserList} from '../../../hooks/chat/useFetchUsers';
import useFetchUserByName from '../../../hooks/useFetchUserByName';
import {backend} from '../../../lib/backend';
import ModalDescription from '../modals/ModalDescription';
import { channel } from 'diagnostics_channel';
import { act } from 'react-dom/test-utils';
import AdminPanel from './AdminPanel';
import { IUser } from 'types/models';

function TopBar() {
	const {responsive} = useResponsiveLayout();
	const updateActiveLobby = useContext(ChatContext).ChatDispatch;
	const {activeLobby} = useContext(ChatContext).ChatState;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const name = useUserInfos().userName.userName;
	const {userList} = useFetchLobbyUserList();
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const {data} = useFetchUserByName(directMessageName(activeLobby!.name));
	const [dropdownVisible, setDropdownVisible] = useState(false);

	function directMessageName(lobbyName: string) {
		const displayedName = lobbyName.split('+');
		if (displayedName[0] === name) return displayedName[1];
		else return displayedName[0];
	}

	function clearActiveLobby() {
		updateActiveLobby({
			type: 'update_active_lobby',
			payload: undefined,
		});
	}

	async function openUserPanel() {
		const user:any = await backend.getUserByName(directMessageName(activeLobby!.name), name);
		ChatDispatch({type: 'active_user_in_panel', payload: user});
		ChatDispatch({type: 'update_user_panel', payload: true});
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
					<F.Text weight="700">#{activeLobby.name}</F.Text>
					<ModalDescription description={activeLobby.description}/>
					{name === activeLobby.adminName && <AdminPanel dropdownVisible={dropdownVisible}
					setDropdownVisible={setDropdownVisible} activeLobby={activeLobby}></AdminPanel>}
				</S.ChannelName>
				<S.UserList onClick={() => setIsModalOpen(true)}>
					<ModalUserSearch
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						userList={userList}
						type={'openUserPanel'}
					/>
					<F.Text>{userList.length}</F.Text>
					<Profile />
				</S.UserList>
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
					<S.ProfilePic src={data?.image} />
					<F.Text weight="700">{data?.name}</F.Text>
				</S.ChannelName>
				<button
					style={{
						backgroundColor: 'transparent',
						border: 'none',
						cursor: 'pointer',
					}}
					onClick={openUserPanel}
				>
					<Profile />
				</button>
			</C.TopBar>
		);
	else return null;
}

export default TopBar;
