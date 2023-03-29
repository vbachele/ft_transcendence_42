import {useSendMessage} from '../../../hooks/chat/useSendMessage';
import * as S from './components.styles';
import {useContext} from 'react';
import ChatContext from '../../../contexts/Chat/context';

function ChatInputBar() {
	const {activeLobby} = useContext(ChatContext).ChatState;
	const {message, setMessage, sendMessage} = useSendMessage(activeLobby!.id);

	return (
		<S.Form onSubmit={sendMessage}>
			<S.ChatBarInput
				type="text"
				placeholder="Message"
				onChange={(event) => setMessage(event.currentTarget.value)}
				value={message}
			/>
			<S.SendButton type="submit" />
		</S.Form>
	);
}

export default ChatInputBar;
