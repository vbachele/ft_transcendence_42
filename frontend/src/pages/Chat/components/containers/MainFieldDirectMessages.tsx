import React, {useContext} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import { MessagesContext } from 'contexts/Chat/MessagesContext';
import TopBarDirectMessages from '../messages/TopBarDirectMessages';
import ChatInputBar from '../messages/ChatInputBar';
import GreyBox from '../messages/Greybox';

function MainFieldDirectMessages() {
	const { dataMessages, isRightBarClosedDM, isRightBarOpenDM, isClickedDM } = useContext(MessagesContext);

    return (
        <S.MiddleDiv open={isRightBarOpenDM || (!isRightBarOpenDM && isClickedDM && isRightBarClosedDM)}>
            {isClickedDM && <TopBarDirectMessages data={dataMessages} />}
            {(isClickedDM || isRightBarOpenDM) &&
                <div style={{overflow: 'auto', flex: 1}}>
                    <GreyBox author="Antoine" date= '17/03/22 18:31' text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                    <GreyBox author="Clément" date= '16/03/22 13:20' text="Nunc nisl leo, tempor vitae feugiat id, tempor eu mi. Phasellus commodo convallis condimentum. Donec a cursus metus, et cursus ipsum. In a magna at ante mollis faucibus at vitae ex. Vestibulum ac eleifend diam, eget imperdiet tortor. Phasellus malesuada, enim sollicitudin posuere varius, lectus dolor molestie sapien, vestibulum hendrerit dolor nisi ac lacus. Vestibulum eros mauris, tempus ac faucibus at, dapibus eget diam. Aenean non porta ipsum. Phasellus lacus erat, bibendum at magna vitae, fermentum consectetur arcu. Etiam ut tristique sem. Fusce non laoreet leo. Donec vestibulum aliquet rutrum. Aenean placerat porttitor nunc. Nullam ut purus efficitur, efficitur justo a, mattis velit." />
                    <GreyBox author="Mathieu" date= '18/03/22 9:11' text="Donec at massa tristique, aliquam felis a, facilisis ex. Sed volutpat diam dignissim tellus ultricies, eu viverra ligula euismod. Fusce vulputate elementum eros, id interdum nisi accumsan non. Pellentesque finibus imperdiet leo semper sollicitudin. Nullam euismod nibh eu lectus sagittis aliquam. In fermentum lectus at massa venenatis, eu ullamcorper ligula fermentum. Vivamus id laoreet lacus, viverra auctor lacus." />
                </div>
            }
            {isClickedDM && <ChatInputBar/>}
        </S.MiddleDiv>
    );
}

export default MainFieldDirectMessages;