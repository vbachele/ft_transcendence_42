import MessagesContext from 'contexts/Chat/MessagesContext';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import { IMessages, IChannels } from '../../data';
import LateralBar from '../containers/LateralBar';
import RightBarDirectMessages from './RightBarDirectMessages';
import MainFieldDirectMessages from '../containers/MainFieldDirectMessages';
import {useState} from 'react';

interface IProps {
	data: IMessages;
}

export const DisplayProfile = ({fill}: {fill: string}) =>{
    return(
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7992 4.8C15.7992 7.45097 13.6502 9.6 10.9992 9.6C8.34825 9.6 6.19922 7.45097 6.19922 4.8C6.19922 2.14903 8.34825 0 10.9992 0C13.6502 0 15.7992 2.14903 15.7992 4.8Z" fill={fill}/>
        <path d="M0.199225 21.6C0.199245 17.6235 3.42279 14.4 7.39922 14.4L14.5992 14.4C18.5757 14.4 21.7992 17.6236 21.7992 21.6V22.8H0.199219L0.199225 21.6Z" fill={fill}/>
        </svg>
    )
}

export const BurgerMenu = ({fill}: {fill: string}) =>{
    return(
        <svg width="24" height="18" viewBox="0 0 24 18" fill='none' xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 12.75H23.25V10.25H0.75V12.75ZM0.75 17.75H23.25V15.25H0.75V17.75ZM0.75 7.75H23.25V5.25H0.75V7.75ZM0.75 0.25V2.75H23.25V0.25H0.75Z" fill={fill}/>
        </svg>
    )
}

function TopBarDirectMessages({data} : IProps) {
    const theme = useContext(ThemeContext);
    const { dataMessages, isMobileClicked, isRightBarOpenDM , setIsRightBarClosedDM, setIsClickedDM, setIsMobileClicked, setIsRightBarOpenDM } = useContext(MessagesContext);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClickBurgerMenu = () => {
        setIsMobileClicked(true);
        setIsRightBarOpenDM(false);
        setIsClickedDM(false);
        setIsRightBarClosedDM(false);
	};

    const handleClickDisplayProfile = () => {
        setIsRightBarOpenDM(true);
	};

    const handleMobileDisplay = () => {
        setIsRightBarOpenDM(false);
        setIsRightBarClosedDM(false);
        setIsClicked(true);
	};

    return !isMobileClicked ? (  
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '56px', padding: '8px 16px', gap: '8px', borderLeft: 0, borderRight: 0, borderTop: theme.name === 'light' ? '0' : "0.2px solid rgb(100, 100, 100)", borderBottom: theme.name === 'light' ? '1px solid #DDDDCC' : "0.2px solid rgb(100, 100, 100)"}}>
            <div className='hiddenDesktop' onClick={handleClickBurgerMenu} style={{cursor: "pointer", padding: '15px'}}> 
                <BurgerMenu fill={theme.name === "light" ? "black" : "white"}/> 
            </div>
            <S.ProfilePic src={data.avatar} style={{width: "40px", borderRadius: "50%"}} />
            {/* <div style={{display: 'flex', flexDirection: 'column', padding: '0px'}}> */}
                <F.Text weight='700'> {data.name} </F.Text>
                {/* <F.Subtitle weight='400'> Last seen 5 mins ago </F.Subtitle> */}
            {/* </div> */}
            <div style={{width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <div className='hiddenMobile' onClick={handleClickDisplayProfile} style={{cursor: 'pointer'}}>
                    {isRightBarOpenDM ? '' : <DisplayProfile fill={theme.name === "light" ? "black" : "white"}/>}
                </div>
                <div className='hiddenDesktop' onClick={handleMobileDisplay} style={{cursor: 'pointer'}}>
                <DisplayProfile fill={theme.name === "light" ? "black" : "white"}/>
                    {isClicked && (<RightBarDirectMessages data={dataMessages}/>)}
                    {/* <DisplayProfile fill={theme.name === "light" ? "black" : "white"}/>
                    {isClicked && <F.H1>SALUUUUUT</F.H1>} */}
                </div>
            </div>
       </div>
    ) : <LateralBar />;

}

export default TopBarDirectMessages;