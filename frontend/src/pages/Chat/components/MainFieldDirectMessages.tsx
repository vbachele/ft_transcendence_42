import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { IMessages } from '../data';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import RightBarDirectMessages from './RightBarDirectMessages';

function MainFieldDirectMessages() {
	const { myData, isClickedDM } = useContext(MessagesContext);

    return (  
        <S.MiddleDiv>
            <S.ContainerMainField>
                <S.ContainerMiddleField>
                    
                </S.ContainerMiddleField>
                {isClickedDM && <RightBarDirectMessages data={myData} />}
            </S.ContainerMainField>
        </S.MiddleDiv> 
    );

}

export default MainFieldDirectMessages;