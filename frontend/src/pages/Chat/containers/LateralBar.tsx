import React, {FormEvent, MouseEvent, useContext, useState} from 'react';
import * as F from 'styles/font.styles';
// import * as S from '../../Chat.styles';
import SearchBox from '../modals/SearchBox';
import {ThemeContext} from 'styled-components';
import {useFetchLobbies} from '../../../hooks/chat/useFetchLobbies';
import * as S from './style';
import {Input} from 'antd';

interface LateralBarProps {
	joinLobby: (event: MouseEvent) => void;
}

function LateralBar({joinLobby}: LateralBarProps) {
	const [search, setSearch] = useState<string>('');
	const lobbies = useFetchLobbies();

	const searchFilter = (value: any): boolean => {
		return value
			.normalize('NFD')
			.toLowerCase()
			.includes(search.normalize('NFD').toLowerCase());
	};

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setSearch(event.currentTarget.value);
	}

	return (
		<S.LateralBar>
			<F.H2 style={{padding: '0 8px'}}>Discussion</F.H2>
			<Input.Search
				onInput={handleChange}
				size="large"
				placeholder="Search"
				enterButton
				style={{padding: '0 8px'}}
			/>
			<S.Header>
				<F.H3> Channels</F.H3>
				<S.NewDiscussion />
			</S.Header>
			<S.Channels>
				{lobbies
					.filter((lobby) => lobby.type === 'channel')
					.filter((lobby) => searchFilter(lobby.id))
					.map((lobby) => (
						<S.Button onClick={joinLobby}>{lobby.id}</S.Button>
					))}
			</S.Channels>
			<S.Header>
				<F.H3> Direct messages</F.H3>
				<S.NewDiscussion />
			</S.Header>
			<S.Channels>
				{lobbies
					.filter((lobby) => lobby.type === 'direct_message')
					.filter((lobby) => searchFilter(lobby.id))
					.map((lobby) => (
						<S.Button onClick={joinLobby}>{lobby.id}</S.Button>
					))}
			</S.Channels>
		</S.LateralBar>
	);
}

export default LateralBar;
