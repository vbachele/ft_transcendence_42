import React, {useContext, useEffect, useState} from 'react';
import { IMessages } from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { ThemeContext } from 'styled-components';
import RightBar from '../containers/UserPanel';

interface IProps {
	data: IMessages;
    onClick: (isClicked: boolean) => void;
}

const Messages: React.FC<IProps> = (props) => {

    const handleClick = () => {
        props.onClick(true);
      };


	const displayPastille = (params: IMessages) => {
        if (params.pastille == 1)
            return (
                <S.PastillePic style={{background: '#2FE837'}} />
            );
        else if (params.pastille == 2)
            return (
                <S.PastillePic style={{background: '#9CA3AF'}} />
            );
        else
            return (
                <S.PastillePic style={{background: '#EB5757'}} />
            );
	};

    const displayMissedMessages = (params: IMessages) => {
        const theme = useContext(ThemeContext);

            if (params.missedMessages > 0 && theme.name === 'light')
                return (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end'}}>
                        <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#707991'}}> {props.data.time} </F.Text>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center', width: '16px', height: '16px'}}>
                            <div style={{width: '16px', height: '16px', backgroundColor: 'black', borderRadius: '42px'}}>
                                <F.Text style={{fontSize: '12px', fontWeight: 400, color: 'white', textAlign: 'center'}}> {props.data.missedMessages} </F.Text>
                            </div>
                        </div>
                    </div>
                );
            else if (params.missedMessages > 0 && theme.name === 'dark')
                return (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end'}}>
                        <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#a6a8ae'}}> {props.data.time} </F.Text>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center', width: '16px', height: '16px'}}>
                            <div style={{width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '42px'}}>
                                <F.Text style={{fontSize: '12px', fontWeight: 600, color: 'black', textAlign: 'center'}}> {props.data.missedMessages} </F.Text>
                            </div>
                        </div>
                    </div>
            );
            else if (params.missedMessages < 1 && theme.name === 'light')
                return (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', paddingTop: '6px'}}>
                        <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#707991'}}> {props.data.time} </F.Text>
                    </div>
                );
            else
                return (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', paddingTop: '6px'}}>
                        <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#a6a8ae'}}> {props.data.time} </F.Text>
                    </div>
                );
    }

    const displayText = () => {
        const theme = useContext(ThemeContext);

        if (theme.name === 'dark')
            return (
                <S.ContainerSubMessages>
                    <F.Text style={{fontWeight: 600}}> {props.data.name} </F.Text>
                    <F.Text 
                    style={{fontSize: '14px', fontWeight: 400, color: '#a6a8ae', whiteSpace: 'nowrap', 
                    overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {props.data.message} 
                    </F.Text>
                </S.ContainerSubMessages>
            );
            else
                return (
                    <S.ContainerSubMessages>
                        <F.Text style={{fontWeight: 600}}> {props.data.name} </F.Text>
                        <F.Text 
                        className='subText'
                        style={{fontSize: '14px', fontWeight: 400, color: '#707991', whiteSpace: 'nowrap', 
                        overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {props.data.message} 
                        </F.Text>
                    </S.ContainerSubMessages>
                );
    }

	return (
		<S.ContainerMessage onClick={handleClick}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{width: '48px', height: '48px', position: 'relative'}}>
                    <S.ProfilePic src={props.data.avatar} />
                    {displayPastille(props.data)}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0 0 8px'}}>
                    {displayText()}
                </div>
            </div>
            {displayMissedMessages(props.data)}
		</S.ContainerMessage>
	);
};

export default Messages;