import React, {Dispatch, SetStateAction, useContext} from 'react';
import * as S from '../../Chat.styles';
import {MessagesContext} from 'contexts/Chat/MessagesContext';
import TopBarDirectMessages from '../messages/TopBarDirectMessages';
import ChatInputBar from '../messages/ChatInputBar';
import EmptyChat from "../messages/EmptyChat";
import RightBarDirectMessages from "../messages/RightBarDirectMessages";
import styled from "styled-components";

const MainFieldLayout = styled.div`
	flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextZone = styled.div`
	text-align: center;
`

interface MainFieldProps {
	lobbyId: string | null;
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}


function MainField({lobbyId, setOpenUserPanel}: MainFieldProps) {
	const {dataMessages, isRightBarClosedDM, isRightBarOpenDM, isClickedDM} =
		useContext(MessagesContext);

	if (!lobbyId) return <EmptyChat />;

	return (
		<MainFieldLayout>
			<TopBarDirectMessages setOpenUserPanel={setOpenUserPanel} lobbyId={lobbyId} />
			<TextZone>
				<div style={{overflow: 'auto', flex: 1}}>
					Content Messages
					<br />
				</div>
				<ChatInputBar />
			</TextZone>


		</MainFieldLayout>
			// <S.MiddleDiv
			// 	open={
			// 		isRightBarOpenDM ||
			// 		(!isRightBarOpenDM && isClickedDM && isRightBarClosedDM)
			// 	}
			// >
			//
			//
			// </S.MiddleDiv>
	);
}

export default MainField
