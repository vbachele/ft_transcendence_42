import React, {FormEvent, useContext, useState} from 'react';
import * as F from 'styles/font.styles';
import * as C from './containers.styles';
import * as S from '../components/components.styles';
import {Input} from 'antd';
import {useJoinLobby} from '../../../hooks/chat/useJoinLobby';
import ChatContext from 'contexts/Chat/chat.context';
import NewDiscussion from '../components/NewDiscussion';
import styled from "styled-components";

const StyledInputSearch = styled(Input.Search)`
  padding: 0 8px;
`

function ChannelBar() {
	const [search, setSearch] = useState<string>('');
	const {joinLobby} = useJoinLobby();
	const {lobbyList} = useContext(ChatContext).ChatState;

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
		<C.LateralBar>
			<F.H2 style={{padding: '0 8px'}}>Discussion</F.H2>
			<StyledInputSearch
				onInput={handleChange}
				size="large"
				placeholder="Search"
				enterButton
			/>
			<C.Header>
				<F.H3> Channels</F.H3>
				<NewDiscussion type={'channel'} />
			</C.Header>
			<C.ChannelList>
				{lobbyList
					.filter((lobby) => lobby.type === 'channel')
					.filter((lobby) => searchFilter(lobby.name))
					.map((lobby, index) => (
						<S.Channel key={index} onClick={joinLobby}>
							#{lobby.name}
						</S.Channel>
					))}
			</C.ChannelList>
			<C.Header>
				<F.H3> Direct messages</F.H3>
				<NewDiscussion type={'direct_message'} />
			</C.Header>
			<C.ChannelList>
				{lobbyList
					.filter((lobby) => lobby.type === 'direct_message')
					.filter((lobby) => searchFilter(lobby.name))
					.map((lobby, index) => (
						<S.Channel key={index} onClick={joinLobby}>
							{lobby.name}
						</S.Channel>
					))}
			</C.ChannelList>
		</C.LateralBar>
	);
}

export default ChannelBar;
