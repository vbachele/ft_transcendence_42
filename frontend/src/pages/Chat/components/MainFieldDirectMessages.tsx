import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { IMessages } from '../data';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import RightBarDirectMessages from './RightBarDirectMessages';
import TopBarDirectMessages from './TopBarDirectMessages';
import ChatInputBar from './ChatInputBar';

function MainFieldDirectMessages() {
	const { myData, isRightBarOpen, isClickedDM } = useContext(MessagesContext);

    return (
        <S.MiddleDiv open={isRightBarOpen}>
            {isRightBarOpen && <TopBarDirectMessages data={myData} />}
            {isRightBarOpen && <ChatInputBar/>}
        </S.MiddleDiv>
    );

}

export default MainFieldDirectMessages;