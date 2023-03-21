import React, {Dispatch, SetStateAction, useContext} from 'react';
import TopBar from '../components/TopBar';
import ChatInputBar from '../components/ChatInputBar';
import EmptyChat from '../components/EmptyChat';
import ChatContext from 'contexts/Chat/context';
import {useReceiveMessage} from 'hooks/chat/useReceiveMessage';
import Message from '../components/Message';
import * as C from './containers.styles';

interface MainFieldProps {
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

function MainField({setOpenUserPanel}: MainFieldProps) {
	const {activeLobby} = useContext(ChatContext).ChatState;
	const messages = useReceiveMessage();

	if (!activeLobby) return <EmptyChat />;


	return (
		<C.MainFieldLayout>
			<TopBar setOpenUserPanel={setOpenUserPanel} />
			<C.Scroller>
				<C.MessageList>
					{messages.map((message, index) => (
						<Message
							key={index}
							authorName={message.authorName}
							content={message.content}
							date={message.createdAt}
						/>
					))}
				</C.MessageList>
			</C.Scroller>
			<ChatInputBar />
		</C.MainFieldLayout>
	);
}

export default MainField;
