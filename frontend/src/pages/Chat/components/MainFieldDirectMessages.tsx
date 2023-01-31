import React, {FormEvent, FormEventHandler, useContext, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import RightBar from './RightBar';
import { IMessages } from '../data';
import { MessagesContext } from 'contexts/Chat/MessagesContext';

function MainFieldDirectMessages() {
	const { myData, isClicked } = useContext(MessagesContext);

    // console.log(myData)
    //  console.log(isClicked)
    return (  
        <S.MiddleDiv>
            <S.ContainerMainField>
                <S.ContainerMiddleField>
                    salut
                </S.ContainerMiddleField>
                {isClicked && <RightBar data={myData} isClicked={isClicked} />}
            </S.ContainerMainField>
        </S.MiddleDiv> 
    );

}

export default MainFieldDirectMessages;