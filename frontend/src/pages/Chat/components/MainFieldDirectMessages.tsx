import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { IMessages } from '../data';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import RightBarDirectMessages from './RightBarDirectMessages';

function MainFieldDirectMessages() {
	const { myData, isClicked } = useContext(MessagesContext);

    // console.log(myData)
    //  console.log(isClicked)
    return (  
        <S.MiddleDiv>
            <S.ContainerMainField>
                <S.ContainerMiddleField>
                    
                </S.ContainerMiddleField>
                {isClicked && <RightBarDirectMessages data={myData} />}
            </S.ContainerMainField>
        </S.MiddleDiv> 
    );

}

export default MainFieldDirectMessages;