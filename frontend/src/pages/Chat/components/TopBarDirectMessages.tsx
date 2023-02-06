import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import { IMessages } from '../data';

interface IProps {
	data: IMessages;
}

function TopBarDirectMessages({data} : IProps) {
    const theme = useContext(ThemeContext);

    return (  
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '56px', padding: '8px 16px', gap: '8px', boxShadow: theme.name === 'light' ? 'rgb(0 0 0 / 20%) 0px 4px 12px -5px' : 'rgb(200 200 200 / 10%) 0px 4px 12px'}}>
            <S.ProfilePic src={data.avatar} style={{width: "40px", borderRadius: "50%"}} />
            <div style={{display: 'flex', flexDirection: 'column', padding: '0px'}}>
                <F.Text weight='700'> {data.name} </F.Text>
                {/* <F.Subtitle weight='400'> Last seen 5 mins ago </F.Subtitle> */}
            </div>
       </div>
    );

}

export default TopBarDirectMessages;