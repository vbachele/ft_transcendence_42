import {Dropdown, MenuProps} from 'antd';
import * as F from 'styles/font.styles';
import {DownOutlined} from '@ant-design/icons';
import * as S from '../components/components.styles';
import React, {useContext, useState} from 'react';
import ModalChangePassword from '../modals/ModalChangePassword';
import {ILobby} from 'contexts/Chat/context';
import ModalChangeDescription from '../modals/ModalChangeDescription';
import SocketContext from '../../../contexts/Socket/context';
import {ClientChatEvents} from '../../../events/chat.events';
import styled, {useTheme} from 'styled-components';

const StyledDropDown = styled(Dropdown)`
	cursor: pointer;
`

interface IProps {
	dropdownVisible: boolean;
	setDropdownVisible: (value: React.SetStateAction<boolean>) => void;
	activeLobby: ILobby;
}

const AdminPanel = ({
	dropdownVisible,
	setDropdownVisible,
	activeLobby,
}: IProps) => {
	const [passPopup, setPassPopup] = useState<boolean>(false);
	const [descriptionPopup, setDescriptionPopup] = useState<boolean>(false);
	const {socket} = useContext(SocketContext).SocketState;
	const theme = useTheme();

	function handlePassword() {
		setPassPopup(true);
		setDropdownVisible(false);
	}

	function handleDescription() {
		setDescriptionPopup(true);
		setDropdownVisible(false);
	}

	function handleDelete() {
		socket?.emit(ClientChatEvents.DeleteLobby, {lobbyId: activeLobby.id});
		setDropdownVisible(false);
	}

	const items: MenuProps['items'] = [
		{
			key: 'Description',
			label: (
				<S.DropdownButton onClick={handleDescription}>
					Change description
				</S.DropdownButton>
			),
		},
		{
			key: 'Password',
			label: (
				<>
					{activeLobby.privacy === 'private' && (
						<S.DropdownButton onClick={handlePassword}>
							Change Password
						</S.DropdownButton>
					)}
				</>
			),
		},
		{
			key: 'Delete',
			label: (
				<S.DropdownButton onClick={handleDelete} style={{color: theme.colors.main}}>
					Delete Channel
				</S.DropdownButton>
			),
		},
	];

	const handleDropdownVisibleChange = (visible: boolean) => {
		setDropdownVisible(visible);
	};

	return (
		<StyledDropDown
			trigger={['click']}
			placement="bottomLeft"
			menu={{items}}
			open={dropdownVisible}
			onOpenChange={handleDropdownVisibleChange}
		>
			<S.DropdownAdmin>
				<F.Subtitle weight="400" fontSize="14px">
					Options
				</F.Subtitle>
				<S.DropdownIcon className="dropdown-arrow" />
				{passPopup && (
					<ModalChangePassword
						click={passPopup}
						onClose={() => setPassPopup(false)}
						activeLobby={activeLobby}
					/>
				)}
				{descriptionPopup && (
					<ModalChangeDescription
						click={descriptionPopup}
						onClose={() => setDescriptionPopup(false)}
						activeLobby={activeLobby}
					/>
				)}
			</S.DropdownAdmin>
		</StyledDropDown>
	);
};

export default AdminPanel;
