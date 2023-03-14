import React, {Dispatch, SetStateAction, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import User from 'mocks/Users/players.json';
import BurgerMenu from 'assets/burger_menu.svg';
import ChatContext from '../../../contexts/Chat/chat.context';
import {useResponsiveLayout} from '../../../hooks/chat/useResponsiveLayout';

interface IProps {
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

export const DisplayProfile = ({fill}: {fill: string}) => {
	return (
		<svg
			width="22"
			height="23"
			viewBox="0 0 22 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.7992 4.8C15.7992 7.45097 13.6502 9.6 10.9992 9.6C8.34825 9.6 6.19922 7.45097 6.19922 4.8C6.19922 2.14903 8.34825 0 10.9992 0C13.6502 0 15.7992 2.14903 15.7992 4.8Z"
				fill={fill}
			/>
			<path
				d="M0.199225 21.6C0.199245 17.6235 3.42279 14.4 7.39922 14.4L14.5992 14.4C18.5757 14.4 21.7992 17.6236 21.7992 21.6V22.8H0.199219L0.199225 21.6Z"
				fill={fill}
			/>
		</svg>
	);
};

const StyledTopBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 16px;
	border-bottom: lightgray solid 1px;
`;

const StyledUser = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;
  button {
	width: 32px;
	height: 32px;
	//all: unset;
	border: none;
	background-color: transparent;
	background-image: url(${BurgerMenu});
	background-position: center;
	background-size: cover;
	cursor: pointer;
  }
  img {
	justify-content: center;
	width: 32px;
	height: 32px;
  }
`;

const user = Array.from(User.players)[0];

function TopBarDirectMessages({setOpenUserPanel}: IProps) {
	const theme = useContext(ThemeContext);
	const {responsive} = useResponsiveLayout();
	const updateActiveLobby = useContext(ChatContext).ChatDispatch

	return (
		<StyledTopBar>
			<StyledUser>
				{responsive && (
					<button onClick={() => {updateActiveLobby({type: 'update_active_lobby', payload: undefined})}}/>
				)}
				<S.ProfilePic src={user.image} />
				<F.Text weight="700"> {user.name} </F.Text>
			</StyledUser>
			<button
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer',
				}}
				onClick={() => setOpenUserPanel(true)}
			>
				<DisplayProfile fill={theme.name === 'light' ? 'black' : 'white'} />
			</button>
		</StyledTopBar>
	);
}

export default TopBarDirectMessages;
