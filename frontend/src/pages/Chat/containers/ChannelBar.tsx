import React, {FormEvent, useContext, useState} from 'react';
import * as F from 'styles/font.styles';
import * as C from './containers.styles';
import {Input} from 'antd';
import ChatContext from 'contexts/Chat/context';
import NewDiscussion from '../components/NewDiscussion';
import styled from 'styled-components';
import {useUserInfos} from '../../../contexts/User/userContent';
import Channel from '../components/Channel';

const StyledInputSearch = styled(Input.Search)`
	padding: 0 8px;
`;

function ChannelBar() {
	const [search, setSearch] = useState<string>('');
	const {lobbyList} = useContext(ChatContext).ChatState;
	const [privateChan, setPrivateChan] = useState<boolean>(false);
	const [expandChan, setExpandChan] = useState(false);
	const [expandDm, setExpandDm] = useState(false);
	const name = useUserInfos().userName.userName;
	const [channelName, setChannelName] = useState<string>('');

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
				<F.H3>
					Channels (
					{[...lobbyList].filter((lobby) => lobby.type === 'channel').length})
				</F.H3>
				<NewDiscussion type={'channel'} />
			</C.Header>
			<C.ChannelList className={expandChan ? 'active' : ''}>
				{[...lobbyList]
					.filter((lobby) => lobby.type === 'channel')
					.filter((lobby) => searchFilter(lobby.name))
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((lobby, index) => (
						<Channel key={lobby.name} lobby={lobby} />
					))}
			</C.ChannelList>
			<C.ExpandButton onClick={() => setExpandChan(!expandChan)}>
				{expandChan ? 'Less' : 'More'}
			</C.ExpandButton>
			<C.Header>
				<F.H3>
					Direct messages (
					{
						[...lobbyList].filter((lobby) => lobby.type === 'direct_message')
							.length
					}
					)
				</F.H3>
				<NewDiscussion type={'direct_message'} />
			</C.Header>
			<C.ChannelList className={expandDm ? 'active' : ''}>
				{[...lobbyList]
					.filter((lobby) => lobby.type === 'direct_message')
					.filter((lobby) => searchFilter(lobby.name))
					.map((lobby, index) => (
						<Channel key={lobby.name} lobby={lobby} />
					))}
			</C.ChannelList>
			<C.ExpandButton onClick={() => setExpandDm(!expandDm)}>
				{expandDm ? 'Less' : 'More'}
			</C.ExpandButton>
		</C.LateralBar>
	);
}

export default ChannelBar;
