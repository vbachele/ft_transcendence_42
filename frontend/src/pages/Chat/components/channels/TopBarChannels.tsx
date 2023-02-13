import MessagesContext from 'contexts/Chat/MessagesContext';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import { IMessages, IChannels } from '../../data';
import LateralBar from '../containers/LateralBar';
import { DisplayProfile } from '../messages/TopBarDirectMessages';

interface IProps {
	data: IChannels;
}

export const DisplayChannelSettings = ({fill}: {fill: string}) =>{
    return(
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.88 0.0600586L8 6.16673L14.12 0.0600586L16 1.94006L8 9.94006L0 1.94006L1.88 0.0600586Z" fill={fill}/>
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

export const QuitChannel = ({fill}: {fill: string}) =>{
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 4.44444L13.59 6.01111L16.17 8.88889H6V11.1111H16.17L13.59 13.9778L15 15.5556L20 10L15 4.44444ZM2 2.22222H10V0H2C0.9 0 0 1 0 2.22222V17.7778C0 19 0.9 20 2 20H10V17.7778H2V2.22222Z" fill={fill} />
        </svg>
    )
}


function TopBarDirectMessages({data} : IProps) {
    const theme = useContext(ThemeContext);
    const { dataChannels, isMobileClicked, setIsClickedChannel, setIsRightBarOpenChannel, setIsRightBarClosedChannel, setIsClickedDM, setIsMobileClicked } = useContext(MessagesContext);

    const handleClickBurgerMenu = () => {
        setIsMobileClicked(true);
        setIsRightBarOpenChannel(false);
        // setIsClickedDM(false);
        setIsRightBarClosedChannel(false);
        setIsClickedChannel(false);
	};

    return !isMobileClicked ? (  
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '56px', padding: '8px 16px', gap: '8px', borderLeft: 0, borderRight: 0, borderTop: theme.name === 'light' ? '0' : "0.2px solid rgb(100, 100, 100)", borderBottom: theme.name === 'light' ? '1px solid #DDDDCC' : "0.2px solid rgb(100, 100, 100)"}}>
            <button className='hiddenDesktop' onClick={handleClickBurgerMenu} style={{cursor: "pointer", border: 'none', backgroundColor: 'transparent'}}> 
                <BurgerMenu fill={theme.name === "light" ? "black" : "white"}/> 
            </button>
            <F.Text weight='700'> #{data.name} </F.Text>
            <div style={{cursor: 'pointer'}}><DisplayChannelSettings fill={theme.name === "light" ? "black" : "white"}/></div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'24px', justifyContent: 'flex-end'}}>
                <div style={{cursor: 'pointer', display:'flex', flexDirection:'row', gap:'8px' ,padding: '8px 8px', borderRadius: '8px', border: theme.name === 'light' ? "0.2px solid rgb(50, 50, 50)" : "0.2px solid rgb(100, 100, 100)"}}>
                    <DisplayProfile fill={theme.name === "light" ? "black" : "white"} />
                    <F.H4> 9 </F.H4>
                </div>
                <div style={{cursor: 'pointer'}}><QuitChannel fill={theme.name === "light" ? "black" : "white"}/></div>
            </div> 
       </div>
    ) : <LateralBar />;

}

export default TopBarDirectMessages;