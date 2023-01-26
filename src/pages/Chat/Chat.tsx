import React, {useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from './Chat.styles';
import SearchBox from './components/SearchBox';
import {GrFormAdd} from 'react-icons/gr';
import InputBox from './components/InputBox';
import ChannelsList from './components/ChannelsList';
import Messages from './components/Message';
import { IMessages } from './data';
import DirectMessages from './components/DirectMessages';

function Chat() {
    return (
        <S.default>
            <S.LateralBar>
                <S.ContainerLateralBar>
                    <F.H2>Discussion</F.H2>
                    <SearchBox />
                    <S.ContainerChannel>
                        <F.H3> Channels</F.H3>
                        <GrFormAdd style={{ width: '24px', height: '24px' }} />
                    </S.ContainerChannel>
                    <ChannelsList />
                    <S.ContainerChannel>
                        <F.H3> Direct messages</F.H3>
                        <GrFormAdd style={{ width: '24px', height: '24px' }} />
                    </S.ContainerChannel>
                    <DirectMessages />
                </S.ContainerLateralBar>
            </S.LateralBar>
            <S.MiddleDiv />
        </S.default>
    );

}

export default Chat;