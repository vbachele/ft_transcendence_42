import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';

function EmptyChat() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
            <F.H3> It's nice to chat with someone </F.H3>
            <F.Text weight='400'> Pick a person from the left menu and start a conversation </F.Text>
        </div>
    );

}

export default EmptyChat;