import React, {FormEvent, FormEventHandler, useEffect, useState} from 'react';
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

    const [search, setSearch] = useState<string>('');

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setSearch(event.currentTarget.value);
    }

    return (
        <S.default>
            <S.LateralBar>
                <S.ContainerLateralBar>
                    <F.H2>Discussion</F.H2>
                    <SearchBox value={search} setValue={handleChange}/>
                    <S.ContainerTitles>
                        <F.H3> Channels</F.H3>
                        <GrFormAdd className='button' style={{ width: '24px', height: '24px' }} />
                    </S.ContainerTitles>
                    <ChannelsList value={search}/>
                    <S.ContainerTitles>
                        <F.H3> Direct messages</F.H3>
                        <GrFormAdd className='button' style={{ width: '24px', height: '24px' }} />
                    </S.ContainerTitles>
                    <DirectMessages value={search}/>
                </S.ContainerLateralBar>
            </S.LateralBar>
            <S.MiddleDiv />
        </S.default>
    );

}

export default Chat;