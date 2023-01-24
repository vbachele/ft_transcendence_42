import React, {useEffect, useState} from 'react';
import { IMessages } from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import './styles.css';
import { ContainerPicture } from '../Chat.styles';

interface IProps {
	data: IMessages;
}

const Messages = ({data}: IProps) => {

	const displayPastille = (params: IMessages) => {
        if (params.pastille == 1)
            return (
                <S.Pastille style={{background: '#2FE837'}} />
            );
        else if (params.pastille == 2)
            return (
                <S.Pastille style={{background: '#9CA3AF'}} />
            );
        else
            return (
                <S.Pastille style={{background: '#EB5757'}} />
            );
	};

	return (
		<S.ContainerMessage>

        <div style={{width: '48px', height: '48px', position: 'relative'}}>

            <S.ProfilePic src={data.avatar} />
            {displayPastille(data)}
        </div>
		</S.ContainerMessage>
	);
};

export default Messages;