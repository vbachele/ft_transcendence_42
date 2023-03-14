import {useSendMessage} from '../../../hooks/chat/useSendMessage';
import styled from 'styled-components';
import * as S from '../Chat.styles';
import Arrow from 'assets/send_message_arrow.svg';

const SendButton = styled.button`
	position: absolute;
	right: 8px;
	cursor: pointer;
	background-image: url(${Arrow});
	background-size: cover;
	background-color: transparent;
	border: none;
	width: 24px;
	height: 24px;
	top: 0;
	bottom: 0;
	margin: auto;
`;

const Form = styled.form`
	position: relative;
	margin: 16px 16px;
`;

function ChatInputBar() {
	const {setMessage, sendMessage} = useSendMessage('ab94cfea-3a4c-4c76-882d-59dbf05d2c3c');

	return (
		<Form onSubmit={sendMessage}>
			<S.ChatBarInput
				type="text"
				placeholder="Message"
				onChange={(event) => setMessage(event.currentTarget.value)}
			/>
			<SendButton type="submit" />
		</Form>
	);
}

export default ChatInputBar;
