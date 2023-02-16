import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { IMessages } from '../../data';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import Messages from './Message';
import { ContainerChannel } from '../../Chat.styles';
import json from '../../../../mocks/Users/directMessages.json'
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import { message } from 'antd';

interface IProps {
	value: string
}

// function useFetch<IMessages>(url: string) {
// 	const [data, setData] = useState<IMessages | null>(null);

// 	useEffect(() => {
// 		fetch(url)
// 			.then(res => res.json())
// 			.then((data: IMessages) => {
// 				setData(data);
// 			})
// 	}, [url]);
    
// 	return {data};
// }

const DirectMessages: React.FC<IProps> = (props) => {
// 	const {data} = useFetch<IMessages[]>(
// 		'http://localhost:3001/directMessages'
// 	);
	const { setDataMessages, setIsMobileClicked, setIsRightBarClosedDM, setIsClickedDM, setIsRightBarOpenDM, setIsClickedChannel } = useContext(MessagesContext);
    const { isClickedChannel, isClickedDM, isRightBarOpenDM } = useContext(MessagesContext);
    console.log(isClickedDM, isRightBarOpenDM, isClickedChannel);
	
	const handleClick = (data: IMessages) => {
		setIsClickedDM(true);
		setIsRightBarClosedDM(true);
		setIsClickedChannel(false);
		setIsMobileClicked(false);
		setIsRightBarOpenDM(false);
		setDataMessages(data)
	};

	let data: IMessages[] = [];
	for (let value in json.directMessages) {
		data.push(json.directMessages[value]);
	}

	let filter = new RegExp(`^.*${props.value}.*`, 'i');
	
    return (
		<S.ContainerMessages>
			<ul>
				{data && data
				.filter((message) => {
					return filter.test(message.name)
				})
				.map((message: IMessages) => (
					<li style={{listStyle: 'none'}} key={message.id}>
							<Messages onClick={() => handleClick(message)} data={message} />
					</li>
				))}
			</ul>
		</S.ContainerMessages>
	);
};

export default DirectMessages;