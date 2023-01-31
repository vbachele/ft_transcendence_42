import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import SearchBox from './SearchBox';
import {GrFormAdd} from 'react-icons/gr';
import ChannelsList from './ChannelsList';
import DirectMessages from './DirectMessages';
import { MessagesContext } from 'contexts/Chat/MessagesContext';


function LateralBar() {
    const [search, setSearch] = useState<string>('');

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setSearch(event.currentTarget.value);
    };

    return (
        <S.LateralBar>
            <S.ContainerLateralBar>
                <F.H2>Discussion</F.H2>
                <SearchBox value={search} setValue={handleChange}/>
                <S.ContainerTitles>
                    <F.H3> Channels</F.H3>
                    <button ><F.H3> + </F.H3></button>
                </S.ContainerTitles>
                <ChannelsList value={search} />
                <S.ContainerTitles>
                    <F.H3> Direct messages</F.H3>
                    <button ><F.H3> + </F.H3></button>
                </S.ContainerTitles>
                <DirectMessages value={search}/>
            </S.ContainerLateralBar>
        </S.LateralBar>
    );

}

export default LateralBar;