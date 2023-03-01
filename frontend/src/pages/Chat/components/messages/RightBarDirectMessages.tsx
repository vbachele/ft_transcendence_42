import MessagesContext from 'contexts/Chat/MessagesContext';
import { useContext, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { IoLogoGameControllerB } from 'react-icons/io';
import { HiUserAdd } from 'react-icons/hi';
import { ImBlocked } from 'react-icons/im';
import { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import { IMessages } from '../../data';
import { ProfilePicRightBar } from '../../Chat.styles';
import LateralBar from '../containers/LateralBar';

interface IProps {
	data: IMessages;
}

export const displayPastille = (params: IMessages) => {
    if (params.pastille == 1)
        return (
            <div style={{display: 'flex', flexDirection:'row', alignItems:'center', paddingBottom: '16px', gap: "8px"}}>
                <S.Pastille style={{background: '#2FE837'}} />
                <F.Text weight='400'> Available</F.Text>
            </div>
        );
    else if (params.pastille == 2)
        return (
            <div style={{display: 'flex', flexDirection:'row', alignItems:'center', paddingBottom: '16px', gap: "8px"}}>
                <S.Pastille style={{background: '#9CA3AF'}} />
                <F.Text weight='400'> Offline</F.Text>
            </div>
        );
    else
        return (
            <div style={{display: 'flex', flexDirection:'row', alignItems:'center', paddingBottom: '16px', gap: "8px"}}>
                <S.Pastille style={{background: '#EB5757'}} />
                <F.Text weight='400'> In game</F.Text>
            </div>
        );
};

function RightBarDirectMessages({data} : IProps) {
    const theme = useContext(ThemeContext);
    const { isClickedDM, isRightBarClosedDM, setIsRightBarClosedDM, setIsClickedDM, setIsRightBarOpenDM } = useContext(MessagesContext);

	const handleClickDesktop = () => {
        setIsRightBarOpenDM(false);
	};

    const handleClickMobile = () => {
        setIsRightBarClosedDM(true);
	};

    return ( 
        <S.ContainerRightField open={isClickedDM && isRightBarClosedDM}>
            <div style={{width: "100%", display: 'text', flexDirection: 'column', justifyContent: "space-between", 
            alignItems: 'center', padding: '0px 0px 16px', borderBottom: theme.name === 'light' ? "0.2px solid rgb(50, 50, 50)" : "0.2px solid rgb(100, 100, 100)"}}>
                <div style={{ display: 'flex', flexDirection:'row', justifyContent: "space-between", 
                alignItems:"center", paddingBottom: '32px'}}>
                    <F.Text> {data.name} </F.Text>
                    <button className='buttonTitles hiddenMobile' onClick={handleClickDesktop} style={{backgroundColor: 'transparent', border: 'none', color: theme.name === 'light' ? 'black' : 'white'}}><F.Text style={{fontSize: "1.4rem", transform: "rotate(-45deg)"}}> + </F.Text></button>
                    <button className='buttonTitles hiddenDesktop' onClick={handleClickMobile} style={{backgroundColor: 'transparent', border: 'none', color: theme.name === 'light' ? 'black' : 'white'}}><F.Text style={{fontSize: "1.4rem", transform: "rotate(-45deg)"}}> + </F.Text></button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <S.ProfilePicRightBar src={data.avatar} style={{paddingBottom: "32px"}} />
                    {displayPastille(data)}
                </div>
            </div>
            <div style={{padding: '16px 0px 24px 0px', borderBottom: theme.name === 'light' ? "0.2px solid rgb(50, 50, 50)" : "0.2px solid rgb(100, 100, 100)"}}>
                <div className='hover' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '8px 8px 0px 8px', gap: '8px'}}>
                    <FaUserAlt />
                    <F.Text weight='500'> View profile</F.Text>
                </div>
                <div className='hover' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '8px 8px 0px 8px', gap: '8px', marginTop: '8px'}}>
                    <IoLogoGameControllerB />
                    <F.Text weight='500'> Invite to a game</F.Text>
                </div>
                <div className='hover' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '8px 8px 0px 8px', gap: '8px', marginTop: '8px'}}>
                    <HiUserAdd />
                    <F.Text weight='500'> Add to friend list </F.Text>
                </div>
                <div className='hover' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '8px 8px 0px 8px', gap: '8px', marginTop: '8px'}}>
                    <ImBlocked />
                    <F.Text weight='500'> Block</F.Text>
                </div>
            </div>
        </S.ContainerRightField>
    );
}

export default RightBarDirectMessages;