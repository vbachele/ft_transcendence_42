import React, {useContext} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import TopBarDirectMessages from './TopBarDirectMessages';
import ChatInputBar from './ChatInputBar';
import EmptyChat from './EmptyChat';

function MainFieldDirectMessages() {
	const { myData, isRightBarOpen, isClickedDM } = useContext(MessagesContext);

    return (
        <S.MiddleDiv open={isRightBarOpen}>
            {!isClickedDM && !isRightBarOpen && <EmptyChat />}
            {isRightBarOpen && <TopBarDirectMessages data={myData} />}
            {(isClickedDM || isRightBarOpen) &&
                <div style={{overflow: 'auto', flex: 1}}>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                    Content<br/>
                </div>
            }
            {isRightBarOpen && <ChatInputBar/>}
        </S.MiddleDiv>
    );
}

export default MainFieldDirectMessages;