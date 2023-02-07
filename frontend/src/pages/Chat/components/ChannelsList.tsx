import React, { useEffect, useState } from 'react';
import { IChannels } from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import Channels from './Channels';
import json from '../../../mocks/Users/channels.json'

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
					<Channels data={channel} />
				</li>
				))}
			</ul>
		</S.ContainerChannels>
	);
};

export default ChannelsList;