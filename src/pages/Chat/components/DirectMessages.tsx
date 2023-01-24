import React, {useEffect, useState} from 'react';
import {IMessages} from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import './styles.css';
import Messages from './Message';
import { ContainerChannel } from '../Chat.styles';

function useFetch<IMessages>(url: string) {
	const [data, setData] = useState<IMessages | null>(null);

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then((data: IMessages) => {
				setData(data);
			})
	}, [url]);
    
	return {data};
}

const DirectMessages = () => {
	const {data} = useFetch<IMessages[]>(
		'http://localhost:3001/directMessages'
	);

    return (
			<S.ContainerMessages>
				{data && data.map((message: IMessages) => (
					<Messages data={message} />
				))}
			</S.ContainerMessages>
	);
};

export default DirectMessages;