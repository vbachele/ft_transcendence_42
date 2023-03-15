import {useSendMessage} from '../../../hooks/chat/useSendMessage';
import * as S from './components.styles';
import {useContext} from 'react';
import ChatContext from '../../../contexts/Chat/chat.context';

function ChatInputBar() {
	const {activeLobby} = useContext(ChatContext).ChatState;
	const {setMessage, sendMessage} = useSendMessage(activeLobby!.id);

	return (
		<S.Form onSubmit={sendMessage}>
			<S.ChatBarInput
				type="text"
				placeholder="Message"
				onChange={(event) => setMessage(event.currentTarget.value)}
			/>
			<S.SendButton type="submit" />
		</S.Form>
	);
}

export default ChatInputBar;
