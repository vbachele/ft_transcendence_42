import React, {ChangeEvent, useEffect, useState} from 'react';
import {IMessages} from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import Messages from './Message';
import { ContainerChannel } from '../Chat.styles';
import json from '../../../mocks/Users/directMessages.json'

interface IProps {
	value: string
}

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

const DirectMessages = (props: IProps) => {
// 	const {data} = useFetch<IMessages[]>(
// 		'http://localhost:3001/directMessages'
// 	);
	let data: IMessages[] = [];
	for (let value in json.directMessages) {
		data.push(json.directMessages[value]);
	}
	let filter = new RegExp(`^.*${props.value}.*`, 'i');
	///\/^.*\// ??? regex de merde 

    return (
		<S.ContainerMessages>
			{data && data
			.filter((message) => {
				return filter.test(message.name)
			})
			.map((message: IMessages) => (
				<Messages data={message} />
			))}
		</S.ContainerMessages>
	);
};

export default DirectMessages;