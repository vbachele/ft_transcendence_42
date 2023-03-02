import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { IMessages } from '../../data';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import Messages from './Message';
import { ContainerChannel } from '../../Chat.styles';
import json from '../../../../mocks/Users/directMessages.json'
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import { message } from 'antd';
import useFetchUsers from 'hooks/useFetchUsers';
import { IUser } from 'types/models';
import SocketContext from 'contexts/Socket/Context';
import { ClientEvents } from 'pages/Game/events/game.events';

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
	const {data, isLoading, error} = useFetchUsers();
	const {socket} = useContext(SocketContext).SocketState;

	const handleClick = (data: IUser) => {
		setIsClickedDM(true);
		setIsRightBarClosedDM(true);
		setIsClickedChannel(false);
		setIsMobileClicked(false);
		setIsRightBarOpenDM(false);
		setDataMessages(data);
		socket?.emit(ClientEvents.CreateLobby, {type:"chat"});
	};

	// let data: IMessages[] = [];
	// for (let value in json.directMessages) {
	// 	data.push(json.directMessages[value]);
	// }

	let filter = new RegExp(`^.*${props.value}.*`, 'i');
	
    return (
		<S.ContainerMessages>
			<ul>
				{data && data
				.filter((message) => {
					return filter.test(message.name)
				})
				.map((message: IUser) => (
					<li style={{listStyle: 'none'}} key={message.id}>
							<Messages onClick={() => handleClick(message)} data={message} />
					</li>
				))}
			</ul>
		</S.ContainerMessages>
	);
};

export default DirectMessages;