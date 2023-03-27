import styled, { ThemeContext } from 'styled-components';
import React, { useRef, useEffect, useState, useContext } from 'react';
import * as F from 'styles/font.styles';
import { useUserInfos } from 'contexts/User/userContent';

// Affichage message temporaire, a modifier
// const MessageContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	padding: 8px 16px;
// 	gap: 8px;
// `;

// const Header = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	border-bottom: 1px solid #e6e6e6;
// `;


interface MessageProps {
	authorName: string;
	content: string;
	date: string;
}


function TextWithBackgroundBox({ content, authorName, date }: MessageProps ) {
//   const textRef = useRef<HTMLDivElement>(null);
//   const [textDimensions, setTextDimensions] = useState<{ width: number | undefined, height: number | undefined }>({ width: undefined, height: undefined });
  const dateUTC = new Date(date);
  const {userName} = useUserInfos();
  const theme = useContext(ThemeContext);


//   useEffect(() => {
//     if (textRef.current) {
//       setTextDimensions({
//         width: textRef.current.offsetWidth,
//         height: textRef.current.offsetHeight,
// 	});
// 	if (textRef.current.offsetWidth < 160)
// 		setTextDimensions({
//         width: textRef.current.offsetWidth + 100,
//         height: textRef.current.offsetHeight,
// 	});
// 	//   console.log(textRef.current.offsetWidth, textRef.current.offsetHeight);
//     }
//   }, [content]);

  console.log('userName :' + userName.userName + '\n' + 'authorName :' + authorName + '\n' + 'Content :' + content)

  return (
	<div style={{margin: '8px', marginBottom: '16px', display: 'flex', flexDirection:'column',
	marginLeft: userName.userName === authorName ? 'auto' : 'none',
	background: userName.userName === authorName ? '#E04F5F' : theme.name === 'light' ? '#E5E7EB' : '#454648',
	borderRadius: '0px 8px 8px 8px', maxWidth: '45%'}}>
		<F.H6 style={{margin: '4px', textAlign: 'left', color: userName.userName === authorName ?  'white' : theme.name === 'light' ? 'black' : 'white'}}>
			{authorName}
		</F.H6>
        <F.Text weight='400' style={{margin: '4px', color: userName.userName === authorName ?  'white' : theme.name === 'light' ? 'black' : 'white'}}>{content}</F.Text>
		<F.Subtitle style={{textAlign: 'right', fontWeight: '400px', fontSize: '15px', margin: '4px',
		color: userName.userName === authorName ?  'white' : theme.name === 'light' ? 'black' : 'white'}}>
			{dateUTC.getDate()}/{dateUTC.getUTCMonth()}/{dateUTC.getUTCFullYear()}{' '}
			- {dateUTC.getUTCHours()}:{dateUTC.getUTCMinutes()}:{dateUTC.getUTCSeconds()}
		</F.Subtitle>
    </div>
  );
}

function Message({authorName, content, date}: MessageProps) {

	return (
		<TextWithBackgroundBox content={content} authorName={authorName} date={date} />
	);
}

export default Message;
