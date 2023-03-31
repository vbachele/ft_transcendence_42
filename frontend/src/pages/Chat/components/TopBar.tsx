import React, {useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../components/components.styles';
import * as C from '../containers/containers.styles';
import ChatContext from '../../../contexts/Chat/context';
import {useResponsiveLayout} from 'hooks/chat/useResponsiveLayout';
import Profile from '../assets/Profile';
import BurgerMenu from '../assets/BurgerMenu';
import {useUserInfos} from 'contexts/User/userContent';
import ModalUserSearch from '../modals/ModalUserSearch';
import {useFetchLobbyUserList} from 'hooks/chat/useFetchUsers';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {backend} from '../../../lib/backend';
import ModalDescription from '../modals/ModalDescription';
import AdminPanel from './AdminPanel';
import {IUser} from '../../../types/models';
import {getDirectMessageContact} from '../helpers/getDirectMessageContact';

function TopBar() {
	const {responsive} = useResponsiveLayout();
	const updateActiveLobby = useContext(ChatContext).ChatDispatch;
	const {activeLobby} = useContext(ChatContext).ChatState;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const name = useUserInfos().userName.userName;
	const {userList} = useFetchLobbyUserList();
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const [dmUser, setDmUser] = useState<IUser | undefined>(undefined);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	useEffect(() => {
		if (activeLobby?.type === 'direct_message' && activeLobby?.users) {
			const dmContact = getDirectMessageContact(activeLobby?.users, name);
			setDmUser(dmContact);
		}
	}, [activeLobby]);

	function clearActiveLobby() {
		updateActiveLobby({
			type: 'update_active_lobby',
			payload: undefined,
		});
	}

	async function openUserPanel() {
		console.log('dm user = ', dmUser)
		console.log(` users = `, activeLobby?.users)
		if (!dmUser) return;
		ChatDispatch({type: 'active_user_in_panel', payload: dmUser});
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
					<ModalDescription description={activeLobby.description} />
					{activeLobby.admins.find((username) => username === name) && (
						<AdminPanel
							dropdownVisible={dropdownVisible}
							setDropdownVisible={setDropdownVisible}
							activeLobby={activeLobby}
						></AdminPanel>
					)}
				</S.ChannelName>
				<S.UserList onClick={() => setIsModalOpen(true)}>
					<ModalUserSearch
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						userList={userList.filter((user) => user.name !== name)}
						type={'openUserPanel'}
					/>
					<F.Text>
						{userList.filter((user) => user.name !== name).length}
					</F.Text>
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
					<S.ProfilePic src={dmUser?.image} />
					<F.Text weight="700">{dmUser?.name}</F.Text>
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
