import * as F from 'styles/font.styles';
import * as S from './Chat.styles';
import LateralBar from './components/LateralBar';
import MainFieldDirectMessages from './components/MainFieldDirectMessages';
import RightBarDirectMessages from './components/RightBarDirectMessages';
import useContext from 'react';
import MessagesContext from '../../contexts/Chat/MessagesContext';
import React from 'react';

function Chat() {

    const {isClickedDM, myData} = React.useContext(MessagesContext);

    return (
            <S.default open={isClickedDM}>
                <LateralBar />
                <MainFieldDirectMessages />
                {isClickedDM && <RightBarDirectMessages data={myData}/>}
            </S.default>
    );

}

export default Chat;