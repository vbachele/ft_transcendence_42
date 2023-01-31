import React, {FormEvent, FormEventHandler, useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { IMessages } from '../data';

interface IProps {
	data: IMessages;
    isClicked: boolean;
}

function RightBar({data, isClicked} : IProps) {

    return (  
        <S.ContainerRightField>
            <div style={{display: 'text', flexDirection: 'column', alignItems: 'center', padding: '0px 0px 16px', gap: '32px', borderBottom: '0.2px solid #000000'}}>
                <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: '0px', gap: '82px'}}>
                    {data.name}
                </div>
            </div>
        </S.ContainerRightField>
    );

}

export default RightBar;