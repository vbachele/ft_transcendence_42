import { MessagesContextProvider } from 'contexts/Chat/MessagesContext';
import React, {FormEvent, FormEventHandler, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from './Chat.styles';
import LateralBar from './components/LateralBar';
import MainFieldChannel from './components/MainFieldChannel';
import MainField from './components/MainFieldChannel';
import MainFieldDirectMessages from './components/MainFieldDirectMessages';
import { IMessages } from './data';

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