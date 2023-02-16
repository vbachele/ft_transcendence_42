import MessagesContext from 'contexts/Chat/MessagesContext';
import React, {useContext} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import EmptyChat from '../messages/EmptyChat';
import TopBarDirectMessages from '../messages/TopBarDirectMessages';
import ChatInputBar from '../messages/ChatInputBar';
import TopBarChannels from '../channels/TopBarChannels';

function MainFieldChannel() {
    const { dataChannels, isClickedChannel, isRightBarOpenChannel } = useContext(MessagesContext);
    
    return (
        <S.MiddleDiv open={isClickedChannel}>
            {isClickedChannel && <TopBarChannels data={dataChannels} />}
            {isClickedChannel &&
                <div style={{overflow: 'auto', flex: 1}}>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                    Content Channel<br/>
                </div>
            }
            {isClickedChannel && <ChatInputBar/>}
        </S.MiddleDiv>
    )
}

export default MainFieldChannel;