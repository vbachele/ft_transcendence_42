import React, {useContext, useEffect, useState} from 'react';
import { IMessages } from '../../data';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import { ThemeContext } from 'styled-components';
import RightBar from './RightBarDirectMessages';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import { IUser } from 'types/models';
import ActivityStatus from 'components/ActivityStatus';

interface IProps {
	data: IUser;
    onClick: (isClicked: boolean) => void;
}

const Messages: React.FC<IProps> = (props) => {

    // const { dataMessages, isClicked } = useContext(MessagesContext);
    // console.log(dataMessages, isClicked)

    // const [dataMessages, setDataMessages] = useState<IMessages>({
	// 	name: "",
	// 	id: -1,
	// 	avatar: "",
	// 	time: "",
	// 	missedMessages: -1,
	// 	message: "",
	// 	pastille: -1 });

    const handleClick = () => {
        props.onClick(true);
      };

    //   const handleData = () => {
    //     setDataMessages(props.data);
    //   };

    //   {handleData}

	const displayPastille = (params: IUser) => {
        if (params.status == "online")
            return (
                <S.PastillePic style={{background: '#2FE837'}} />
            );
        else if (params.status == "offline")
            return (
                <S.PastillePic style={{background: '#9CA3AF'}} />
            );
        else
            return (
                <S.PastillePic style={{background: '#EB5757'}} />
            );
	};

    // const displayMissedMessages = (params: IMessages) => {
    //     const theme = useContext(ThemeContext);

    //         if (params.missedMessages > 0 && theme.name === 'light')
    //             return (
    //                 <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end'}}>
    //                     <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#707991'}}> {props.data.time} </F.Text>
    //                     <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center', width: '16px', height: '16px'}}>
    //                         <div style={{width: '16px', height: '16px', backgroundColor: 'black', borderRadius: '42px'}}>
    //                             <F.Text style={{fontSize: '12px', fontWeight: 400, color: 'white', textAlign: 'center'}}> {props.data.missedMessages} </F.Text>
    //                         </div>
    //                     </div>
    //                 </div>
    //             );
    //         else if (params.missedMessages > 0 && theme.name === 'dark')
    //             return (
    //                 <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end'}}>
    //                     <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#a6a8ae'}}> {props.data.time} </F.Text>
    //                     <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center', width: '16px', height: '16px'}}>
    //                         <div style={{width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '42px'}}>
    //                             <F.Text style={{fontSize: '12px', fontWeight: 600, color: 'black', textAlign: 'center'}}> {props.data.missedMessages} </F.Text>
    //                         </div>
    //                     </div>
    //                 </div>
    //         );
    //         else if (params.missedMessages < 1 && theme.name === 'light')
    //             return (
    //                 <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', paddingTop: '6px'}}>
    //                     <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#707991'}}> {props.data.time} </F.Text>
    //                 </div>
    //             );
    //         else
    //             return (
    //                 <div style={{display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', paddingTop: '6px'}}>
    //                     <F.Text style={{fontSize: '12px', fontWeight: 400, color: '#a6a8ae'}}> {props.data.time} </F.Text>
    //                 </div>
    //             );
    // }

    const displayText = () => {
        const theme = useContext(ThemeContext);

        if (theme.name === 'dark')
            return (
                <S.ContainerSubMessages>
                    <F.Text style={{fontWeight: 600}}> {props.data.name} </F.Text>
                    {/* <F.Text 
                    style={{fontSize: '14px', fontWeight: 400, color: '#a6a8ae', whiteSpace: 'nowrap', 
                    overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {props.data.message} 
                    </F.Text> */}
                </S.ContainerSubMessages>
            );
            else
                return (
                    <S.ContainerSubMessages>
                        <F.Text style={{fontWeight: 600}}> {props.data.name} </F.Text>
                        {/* <F.Text 
                        className='subText'
                        style={{fontSize: '14px', fontWeight: 400, color: '#707991', whiteSpace: 'nowrap', 
                        overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {props.data.message} 
                        </F.Text> */}
                    </S.ContainerSubMessages>
                );
    }

	return (
		<S.ContainerMessage onClick={handleClick}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{width: '48px', height: '48px', position: 'relative'}}>
                    <S.ProfilePic src={props.data.image} />
                    {displayPastille(props.data)}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0 0 8px'}}>
                    {displayText()}
                </div>
            </div>
            {/* {displayMissedMessages(props.data)} */}
		</S.ContainerMessage>
	);
};

export default Messages;