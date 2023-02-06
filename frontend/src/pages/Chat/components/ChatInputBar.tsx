import MessagesContext from 'contexts/Chat/MessagesContext';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';


function ChatInputBar() {
    const theme = useContext(ThemeContext);
    const { isClickedDM } = useContext(MessagesContext);

    return ( 
        <S.ChatBarContainer>
            <S.ChatBarInput open={isClickedDM} />
        </S.ChatBarContainer>
    );

}

export default ChatInputBar;