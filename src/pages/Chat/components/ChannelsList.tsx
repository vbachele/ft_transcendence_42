import React, { useEffect, useState } from 'react';
import { IChannels } from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import Channels from './Channels';

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

const ChannelsList = () => {
	const {data} = useFetch<IChannels[]>(
		'http://localhost:3000/channels'
	);

	return (
		<div style={{width: '100%'}}>
			{data && (<Channels channels={data} />)}
		</div>
	);
};

export default ChannelsList;