import MessagesContext from 'contexts/Chat/MessagesContext';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { IMessages } from '../data';
import LateralBar from './LateralBar';

interface IProps {
	data: IMessages;
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
    const { isMobileClicked, setIsClickedDM, setIsMobileClicked, setIsRightBarOpen } = useContext(MessagesContext);

    const handleClick = () => {
        setIsMobileClicked(!isMobileClicked);
        setIsRightBarOpen(false);
        setIsClickedDM(false);
	};

    return !isMobileClicked ? (  
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '56px', padding: '8px 16px', gap: '8px', borderLeft: 0, borderRight: 0, borderTop: theme.name === 'light' ? '0' : "0.2px solid rgb(100, 100, 100)", borderBottom: theme.name === 'light' ? '1px solid #DDDDCC' : "0.2px solid rgb(100, 100, 100)"}}>
            <button className='hidden' onClick={handleClick} style={{cursor: "pointer", border: 'none', backgroundColor: 'transparent'}}> 
                <BurgerMenu fill={theme.name === "light" ? "black" : "white"}/> 
            </button>
            <S.ProfilePic src={data.avatar} style={{width: "40px", borderRadius: "50%"}} />
            <div style={{display: 'flex', flexDirection: 'column', padding: '0px'}}>
                <F.Text weight='700'> {data.name} </F.Text>
                {/* <F.Subtitle weight='400'> Last seen 5 mins ago </F.Subtitle> */}
            </div>
       </div>
    ) : <LateralBar />;

}

export default TopBarDirectMessages;