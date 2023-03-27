import React, {FormEvent, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as C from './containers.styles';
import * as S from '../components/components.styles';
import {Input} from 'antd';
import {useJoinLobby} from '../../../hooks/chat/useJoinLobby';
import ChatContext from 'contexts/Chat/context';
import NewDiscussion from '../components/NewDiscussion';
import styled from 'styled-components';
import {useUserInfos} from '../../../contexts/User/userContent';
import {AiTwotoneLock} from "react-icons/ai";
import ModalChanPass from '../modals/ModalChanPass';
import {backend} from '../../../lib/backend';
import Channel from '../components/Channel';

const StyledInputSearch = styled(Input.Search)`
	padding: 0 8px;
`;

function ChannelBar() {
	const [search, setSearch] = useState<string>('');
	const {lobbyList} = useContext(ChatContext).ChatState;
	const [privateChan, setPrivateChan] = useState<boolean>(false); 
	const name = useUserInfos().userName.userName;
	const [channelName, setChannelName] = useState<string>("");
	

	const searchFilter = (value: any): boolean => {
		return value
			.normalize('NFD')
			.toLowerCase()
			.includes(search.normalize('NFD').toLowerCase());
	};

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setSearch(event.currentTarget.value);
		setPrivateChan(!privateChan);
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
				{[...lobbyList]
					.filter((lobby) => lobby.type === 'channel')
					.filter((lobby) => searchFilter(lobby.name))
					.map((lobby, index) => (
						<Channel key={lobby.name} lobby={lobby} />
					))}
			</C.ChannelList>			<C.Header>
				<F.H3> Direct messages</F.H3>
				<NewDiscussion type={'direct_message'} />
			</C.Header>
			<C.ChannelList>
				{[...lobbyList]
					.filter((lobby) => lobby.type === 'direct_message')
					.filter((lobby) => searchFilter(lobby.name))
					.map((lobby, index) => (
						<Channel key={lobby.name} lobby={lobby}/>
					))}
			</C.ChannelList>
		</C.LateralBar>
	);
}

export default ChannelBar;
