import styled, {ThemeContext} from 'styled-components';
import {useContext} from 'react';
import * as F from 'styles/font.styles';
import {useUserInfos} from 'contexts/User/userContent';
import useFetchUserByName from 'hooks/useFetchUserByName';

const ImgContainer = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
`;

const BoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 0px 8px 8px 8px;
	max-width: 70%;
	min-width: 300px;
	margin: 8px;
	margin-bottom: 16px;
`;

interface MessageProps {
	authorName: string;
	content: string;
	date: string;
}

function TextWithBackgroundBox({content, authorName, date}: MessageProps) {
	const dateUTC = new Date(date);
	const {userName} = useUserInfos();
	const {data} = useFetchUserByName(authorName);
	const theme = useContext(ThemeContext);

	return (
		<Container
			style={{
				justifyContent:
					userName.userName === authorName ? 'flex-end' : 'flex-start',
			}}
		>
			<ImgContainer src={data?.image} alt={data?.name + ' avatar'} />
			<BoxContainer
				style={{
					background:
						userName.userName === authorName
							? '#dc4f19'
							: theme.name === 'light'
							? '#E5E7EB'
							: '#454648',
				}}
			>
				<F.H6
					style={{
						margin: '4px 8px 4px 8px',
						textAlign: 'left',
						color:
							userName.userName === authorName
								? 'white'
								: theme.name === 'light'
								? 'black'
								: 'white',
					}}
				>
					{authorName}
				</F.H6>
				<F.Text
					weight="400"
					style={{
						margin: '4px 8px 4px 8px',
						color:
							userName.userName === authorName
								? 'white'
								: theme.name === 'light'
								? 'black'
								: 'white',
					}}
				>
					{content}
				</F.Text>
				<F.Subtitle
					style={{
						textAlign: 'right',
						fontWeight: '400px',
						fontSize: '15px',
						margin: '4px 8px 4px 8px',
						color:
							userName.userName === authorName
								? 'white'
								: theme.name === 'light'
								? 'black'
								: 'white',
					}}
				>
					{dateUTC.getDate()}/{dateUTC.getUTCMonth() + (1 % 12)}/
					{dateUTC.getUTCFullYear()} - {dateUTC.getUTCHours() + (1 % 12)}:
					{dateUTC.getUTCMinutes()}:{dateUTC.getUTCSeconds()}
				</F.Subtitle>
			</BoxContainer>
		</Container>
	);
}

function Message({authorName, content, date}: MessageProps) {
	return (
		<TextWithBackgroundBox
			content={content}
			authorName={authorName}
			date={date}
		/>
	);
}

export default Message;
