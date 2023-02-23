import * as F from 'styles/font.styles';
import * as S from './Chat.styles';
import LateralBar from './components/containers/LateralBar';
import MainFieldDirectMessages from './components/containers/MainFieldDirectMessages';
import RightBarDirectMessages from './components/messages/RightBarDirectMessages';
import useContext from 'react';
import MessagesContext from '../../contexts/Chat/MessagesContext';
import React from 'react';
import MainFieldChannel from './components/containers/MainFieldChannel';
import EmptyChat from './components/messages/EmptyChat';
import ModalChanSettings from './components/modals/ModalChanSettings';
import ModalChanPass from './components/modals/ModalChanPass';
import ModalChanCreate from './components/modals/ModalChanCreate';

function Chat() {

    const {isClickedDM, isRightBarClosedDM, isClickedChannel, dataMessages, isRightBarOpenDM} = React.useContext(MessagesContext);
    return (
        <S.default>
            <LateralBar />
            {!isClickedDM && !isRightBarOpenDM && !isClickedChannel && <EmptyChat />}
            {isClickedChannel && <MainFieldChannel />}
            {isClickedDM && <MainFieldDirectMessages />}
            {(isRightBarOpenDM || (!isRightBarClosedDM && isClickedDM)) && <RightBarDirectMessages data={dataMessages}/>}
        </S.default>

        // <ModalChanSettings />
        // <ModalChanPass />
        // <ModalChanCreate />
    );
}

export default Chat;