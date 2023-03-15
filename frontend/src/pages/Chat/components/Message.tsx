import styled from 'styled-components';

// Affichage message temporaire, a modifier
const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px 16px;
	gap: 8px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e6e6e6;
`;

interface MessageProps {
	authorName: string;
	content: string;
	date: string;
}

function Message({authorName, content, date}: MessageProps) {
	const dateUTC = new Date(date);

	return (
		<MessageContainer>
			<Header>
				<h3>{authorName}</h3>
				<h5>
					{dateUTC.getDate()}/{dateUTC.getUTCMonth()}/{dateUTC.getUTCFullYear()}{' '}
					- {dateUTC.getUTCHours()}:{dateUTC.getUTCMinutes()}:{dateUTC.getUTCSeconds()}
				</h5>
			</Header>
			<p>{content}</p>
		</MessageContainer>
	);
}

export default Message;
