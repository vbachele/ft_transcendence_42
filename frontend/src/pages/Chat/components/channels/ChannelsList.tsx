import React, { useContext, useEffect, useState } from 'react';
import { IChannels, IMessages } from '../../data';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import Channels from './Channels';
import json from '../../../../mocks/Users/channels.json'
import MessagesContext from 'contexts/Chat/MessagesContext';

interface IProps {
	value: string
}

function useFetch<IChannels>(url: string) {
	const [data, setData] = useState<IChannels | null>(null);

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then((data: IChannels) => {
				setData(data);
			})
	}, [url]);
    
	return {data};
}

const ChannelsList = (props: IProps) => {
	// const {data} = useFetch<IChannels[]>(
	// 	'http://localhost:3000/channels'
	// );

	const { setDataChannels, setIsMobileClicked, setIsRightBarOpenDM, setIsRightBarClosedDM, setIsClickedDM, setIsClickedChannel } = useContext(MessagesContext);

	const handleClick = (data: IChannels) => {
		setIsClickedDM(false);
		setIsMobileClicked(false);
		// setIsRightBarClosedDM(false);
		setIsRightBarOpenDM(false);
		setIsClickedChannel(true);
		setDataChannels(data)
	};
	
	let data: IChannels[] = [];
	for (let value in json.channels) {
		data.push(json.channels[value]);
	}

	let filter = new RegExp(`^.*${props.value}.*`, 'i');

	return (
		<S.ContainerChannels>
			<ul>
				{data && data
				.filter((message) => {
					return filter.test(message.name)
				})
				.map((channel: IChannels) => (
				<li style={{listStyle: 'none'}} key={channel.id}>
					<Channels onClick={() => handleClick(channel)} data={channel} />
				</li>
				))}
			</ul>
		</S.ContainerChannels>
	);
};

export default ChannelsList;