import { MessagesContextProvider } from 'contexts/Chat/MessagesContext';
import * as F from 'styles/font.styles';
import * as S from './Chat.styles';
import LateralBar from './components/LateralBar';
import MainFieldDirectMessages from './components/MainFieldDirectMessages';

function Chat() {

    return (
        <MessagesContextProvider>
            <S.default>
                <LateralBar />
                <MainFieldDirectMessages />
            </S.default>
        </MessagesContextProvider>
    );

}

export default Chat;