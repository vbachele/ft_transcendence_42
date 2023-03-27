import {useNavigate} from 'react-router-dom';
import {DownOutlined} from '@ant-design/icons';
import {MenuProps} from 'antd';
import {Dropdown} from 'antd';
import {IUser} from 'types/models';
import {useUserInfos} from 'contexts/User/userContent';
import isUserIn from 'helpers/isUserIn';
import Buttons from 'components/Buttons';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import {GameMode} from 'pages/Game/types/game.type';
import {useContext} from 'react';
import SocketContext from 'contexts/Socket/context';
import {usePopup} from 'contexts/Popup/Popup';
import {ClientEvents, ServerEvents} from 'events/socket.events';
import {ClientGameEvents} from 'events/game.events';

interface IProps {
	user: IUser;
	status: string;
	friendUsers: IUser[];
	dropdownVisible: boolean;
	setDropdownVisible: (value: React.SetStateAction<boolean>) => void;
}

const UserDropdown = ({
	user,
	status,
	friendUsers,
	dropdownVisible,
	setDropdownVisible,
}: IProps) => {
	const {userName} = useUserInfos();
	const myself: Boolean = userName.userName === user.name;
	const navigate = useNavigate();
	const {socket} = useContext(SocketContext).SocketState;
	const {setHasInvited} = usePopup();

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
					invitedClientName: user.name,
				});
			}
		});
	}

	const redirectToHome = () => {
		navigate('/');
	};

	const handleDropdownVisibleChange = (visible: boolean) => {
		setDropdownVisible(visible);
	};

	const items: MenuProps['items'] = [
		{
			label: (
				<>
					{!isUserIn(friendUsers, user.name) && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Buttons.AddFriend user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'ADD',
		},
		{
			label: (
				<S.OptionButton>
					<Buttons.Message user={user.name} />
				</S.OptionButton>
			),
			key: 'MESSAGE',
		},
		{
			key: 'INVITE',
			disabled: !(isUserIn(friendUsers, user.name) && status === 'online'),
			label: 'Invite to play',
			children: [
				{
					key: 'INVITE-CLOCK',
					label: 'Against the clock',
					onClick: () => {
						onInvite(GameMode.AgainstTheClock);
						setDropdownVisible(false);
					},
				},
				{
					key: 'INVITE-SCORE',
					label: 'Score limit',
					onClick: () => {
						onInvite(GameMode.ScoreLimit);
						setDropdownVisible(false);
					},
				},
			],
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user.name) && status === 'ingame' && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Buttons.Spectate user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'SPECTATE',
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user.name) && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Buttons.RemoveFriend user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'REMOVE',
		},
		{
			label: (
				<>
					{true && (
						<S.OptionButton onClick={redirectToHome}>
							<Buttons.BlockUser user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'BLOCK',
		},
	];

	return (
		<S.DropdownContainer>
			{!myself && (
				<Dropdown
					trigger={['click']}
					placement="bottomLeft"
					menu={{items}}
					open={dropdownVisible}
					onOpenChange={handleDropdownVisibleChange}
				>
					<div className="antd-space">
						<F.Text weight="500">Options</F.Text>
						<DownOutlined className="dropdown-arrow" />
					</div>
				</Dropdown>
			)}
		</S.DropdownContainer>
	);
};

export default UserDropdown;
