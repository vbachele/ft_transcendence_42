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

    const displayMissedMessages = (params: IMessages) => {
            if (params.missedMessages > 0)
                return (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end'}}>
                        <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#707991'}}> {data.time} </F.Text>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center', width: '16px', height: '16px'}}>
                            <div style={{width: '16px', height: '16px', backgroundColor: 'black', borderRadius: '42px'}}>
                                <F.Text style={{fontSize: '12px', fontWeight: 400, color: 'white', textAlign: 'center'}}> {data.missedMessages} </F.Text>
                            </div>
                        </div>
                    </div>
                );
            else
                return (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end'}}>
                        <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#707991'}}> {data.time} </F.Text>
                    </div>
                );
    }

	return (
		<S.ContainerMessage>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{width: '48px', height: '48px', position: 'relative'}}>
                    <S.ProfilePic src={data.avatar} />
                    {displayPastille(data)}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0 0 8px'}}>
                    <F.Text style={{fontWeight: 600}}> {data.name} </F.Text>
                    <F.Text 
                    style={{fontSize: '14px', fontWeight: 400, color: '#707991', whiteSpace: 'nowrap', 
                    overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '13vw'}}>
                    {data.message} 
                    </F.Text>
                </div>
            </div>
            {displayMissedMessages(data)}
		</S.ContainerMessage>
	);
};

export default Messages;