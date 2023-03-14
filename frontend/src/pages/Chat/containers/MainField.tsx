import React, {Dispatch, ReactElement, SetStateAction, useContext, useState} from 'react';
import TopBarDirectMessages from '../components/TopBarDirectMessages';
import ChatInputBar from '../components/ChatInputBar';
import EmptyChat from '../components/EmptyChat';
import styled from 'styled-components';
import ChatContext from '../../../contexts/Chat/chat.context';
import {useReceiveMessage} from '../../../hooks/chat/useReceiveMessage';

const MainFieldLayout = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
`;

const Scroller = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
`;

const Messages = styled.div``;

interface MainFieldProps {
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

function MainField({setOpenUserPanel}: MainFieldProps) {
	const {activeLobby} = useContext(ChatContext).ChatState;

	if (!activeLobby) return <EmptyChat />;

	const messages = useReceiveMessage(activeLobby!.id);

	return (
		<MainFieldLayout>
			<TopBarDirectMessages setOpenUserPanel={setOpenUserPanel} />
			<Scroller>
				<Messages>
					{messages.map((message, index) => (
						<p key={index}>{message}</p>
					))}
				</Messages>
			</Scroller>
			<ChatInputBar />
		</MainFieldLayout>
	);
}

export default MainField;
