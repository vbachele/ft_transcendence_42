import React, {useContext} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import TopBarDirectMessages from '../messages/TopBarDirectMessages';
import ChatInputBar from '../messages/ChatInputBar';
import EmptyChat from '../messages/EmptyChat';
import RightBarDirectMessages from '../messages/RightBarDirectMessages';

function MainFieldDirectMessages() {
	const { dataMessages, isRightBarClosedDM, isRightBarOpenDM, isClickedDM } = useContext(MessagesContext);

    return (
        <S.MiddleDiv open={isRightBarOpenDM || (!isRightBarOpenDM && isClickedDM && isRightBarClosedDM)}>
            {isClickedDM && <TopBarDirectMessages data={dataMessages} />}
            {(isClickedDM || isRightBarOpenDM) &&
                <div style={{overflow: 'auto', flex: 1}}>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                    Content Messages<br/>
                </div>
            }
            {isClickedDM && <ChatInputBar/>}
        </S.MiddleDiv>
    );
}

export default MainFieldDirectMessages;