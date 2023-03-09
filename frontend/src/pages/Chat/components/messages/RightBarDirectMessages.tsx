import {Dispatch, SetStateAction, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import * as F from 'styles/font.styles';
// import * as S from '../../Chat.styles';
import {IMessages} from '../../data';
import ViewProfile from '../../../../components/Buttons/Social/ViewProfile';
import Invite from '../../../../components/Buttons/Social/Invite';
import Message from '../../../../components/Buttons/Social/Message';
import AddFriend from '../../../../components/Buttons/Social/AddFriend';
import RemoveFriend from '../../../../components/Buttons/Social/RemoveFriend';
import BlockUser from '../../../../components/Buttons/Social/BlockUser';
import Mute from '../../../../components/Buttons/Channel/Mute';
import Ban from '../../../../components/Buttons/Channel/Ban';
import * as S from '../../../Social/Social.styles';
import User from 'mocks/Users/players.json'
import ActivityStatus from "../../../../components/ActivityStatus";
import {Divider} from "antd";
import {ReactComponent as Close} from 'assets/close.svg';


interface IProps {
	data: IMessages;
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

const user = Array.from(User.players)[0]

const StyledRightBar = styled.div`
  width: 100%;
  padding: 16px;
  @media only screen and (min-width: 768px) {
    border-left: lightgray solid 1px;
    width: 300px;
  }
`

function RightBarDirectMessages({setOpenUserPanel} : IProps) {
    const theme = useContext(ThemeContext);

    return (

        <StyledRightBar>
            <S.DrawerTitle>
                <F.H3>{user.name}</F.H3>
                <Close onClick={() => setOpenUserPanel(false)} />
            </S.DrawerTitle>
            <S.FriendDetails>
                <img className="drawer__avatar" src={user.image} />
                <ActivityStatus state={user.status} />
            </S.FriendDetails>
            <Divider style={{backgroundColor: '#bbbbbb'}} />
            <S.FriendOptions>
                <ViewProfile id={1} />
                <Invite id={user.name} />
                <Message id={1} />
                <AddFriend id={1} />
                <RemoveFriend id={1} />
                <BlockUser id={1} />
                <Mute id={1} />
                <Ban id={1} />
            </S.FriendOptions>
        </StyledRightBar>
    );
}

export default RightBarDirectMessages;