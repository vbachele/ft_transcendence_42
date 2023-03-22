import React, {useContext} from 'react';
import TopBar from '../components/TopBar';
import ChatInputBar from '../components/ChatInputBar';
import EmptyChat from '../components/EmptyChat';
import ChatContext from 'contexts/Chat/context';
import {useReceiveMessage} from 'hooks/chat/useReceiveMessage';
import Message from '../components/Message';
import * as C from './containers.styles';

function MainField() {
	const {activeLobby} = useContext(ChatContext).ChatState;
	const messages = useReceiveMessage(activeLobby);

	if (!activeLobby) return <EmptyChat />;

	return (
		<C.MainFieldLayout>
			<TopBar />
			<C.Scroller>
				<C.MessageList key={activeLobby?.id}>
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
