import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import SearchBox from './SearchBox';
import {GrFormAdd} from 'react-icons/gr';
import ChannelsList from './ChannelsList';
import DirectMessages from './DirectMessages';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import { ThemeContext } from 'styled-components';


function LateralBar() {
    const theme = useContext(ThemeContext);
    const [search, setSearch] = useState<string>('');
    const { isRightBarOpen } = useContext(MessagesContext);

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setSearch(event.currentTarget.value);
    };

    return (
        <S.LateralBar open={isRightBarOpen}>
            {/* <S.ContainerLateralBar> */}
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 16px', gap: '8px'}}>
                <F.H2>Discussion</F.H2>
                <SearchBox value={search} setValue={handleChange}/>
            </div>
                <S.ContainerTitles>
                    <F.H3> Channels</F.H3>
                    <button className='buttonTitles' style={{border : 'none', color: theme.name === 'light' ? 'black' : 'white', backgroundColor : 'transparent'}}><F.H3> + </F.H3></button>
                </S.ContainerTitles>
                <ChannelsList value={search} />
                <S.ContainerTitles>
                    <F.H3> Direct messages</F.H3>
                    <button className='buttonTitles' style={{border : 'none', color: theme.name === 'light' ? 'black' : 'white', backgroundColor : 'transparent'}}><F.H3> + </F.H3></button>
                </S.ContainerTitles>
                <DirectMessages value={search}/>
            {/* </S.ContainerLateralBar> */}
        </S.LateralBar>
    );

}

export default LateralBar;