import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import SearchBox from '../modals/SearchBox';
import {GrFormAdd} from 'react-icons/gr';
import ChannelsList from '../channels/ChannelsList';
import DirectMessages from '../messages/DirectMessages';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import { ThemeContext } from 'styled-components';


function LateralBar() {
    const theme = useContext(ThemeContext);
    const [search, setSearch] = useState<string>('');
    const { isRightBarOpenDM, isClickedChannel, isClickedDM, setIsPopupClicked } = useContext(MessagesContext);

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setSearch(event.currentTarget.value);
    };

    const handleClicked = () => 
    {
        setIsPopupClicked(true);
    };


    return (
        <S.LateralBarContainer open={isRightBarOpenDM || isClickedChannel || (!isRightBarOpenDM && isClickedDM)}>
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
                    <button onClick={handleClicked} className='buttonTitles' style={{border : 'none', color: theme.name === 'light' ? 'black' : 'white', backgroundColor : 'transparent'}}><F.H3> + </F.H3></button>
                </S.ContainerTitles>
                <DirectMessages value={search}/>
        </S.LateralBarContainer>
    );

}

export default LateralBar;