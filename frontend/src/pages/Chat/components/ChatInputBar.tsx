import MessagesContext from 'contexts/Chat/MessagesContext';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';

export const Arrow = () =>{
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8141 10.1968L3.2821 11.4528C3.19551 11.4673 3.11425 11.5043 3.04649 11.5601C2.97873 11.6159 2.92686 11.6886 2.8961 11.7708L0.299103 18.7278C0.0511033 19.3678 0.720103 19.9778 1.3341 19.6708L19.3341 10.6708C19.4588 10.6086 19.5636 10.5128 19.6369 10.3943C19.7102 10.2758 19.7491 10.1392 19.7491 9.99984C19.7491 9.86049 19.7102 9.72389 19.6369 9.60537C19.5636 9.48685 19.4588 9.39109 19.3341 9.32884L1.3341 0.32884C0.720103 0.0218396 0.0511033 0.63284 0.299103 1.27184L2.8971 8.22884C2.92772 8.31125 2.97952 8.38414 3.04729 8.44014C3.11506 8.49615 3.1964 8.5333 3.2831 8.54784L10.8151 9.80284C10.8615 9.81096 10.9035 9.83516 10.9337 9.8712C10.964 9.90723 10.9806 9.95278 10.9806 9.99984C10.9806 10.0469 10.964 10.0925 10.9337 10.1285C10.9035 10.1645 10.8615 10.1887 10.8151 10.1968H10.8141Z" fill="#8BABD8"/>
        </svg>
    )
  }

function ChatInputBar() {
    const theme = useContext(ThemeContext);
    const { isClickedDM } = useContext(MessagesContext);

    return ( 
        // <S.ChatBarContainer open={isClickedDM}>
        <div style={{position: 'relative', margin: '8px 16px'}}>
            <S.ChatBarInput open={isClickedDM} placeholder="Message" />
            <div style={{position: 'absolute', right: 8, top: '25%', height: '20px'}}>
                <Arrow />
            </div>
        </div>
        // </S.ChatBarContainer>
    );
    /*
<html>
    <style>

        .users::-webkit-scrollbar {
            width: 50px;
            background-color: black;
        }

        #nav_bar {
            background-color: lightgray;
            padding: 16px;
            text-align: center;
        }

        #main {
            display: flex;
            flex-direction: row;
            flex: 1 1 0;
            min-height: 0;
        }

        #left_bar {
            display: flex;
            flex-direction: column;
            width: 256px;
            overflow: auto;
        }

        #channels {
            padding: 16px;
            background-color: grey;
        }

        #users {
            padding: 16px;
            background-color: yellow;
        }

        #chat_zone {
            padding: 16px;
            background-color: purple;
            text-align: center;
            flex: 1;
        }

    </style>
    <div id="nav_bar">
        Navigation Bar
    </div>
    <div id="main">
        <div id="left_bar">
            <div id="channels">
                Channels
                <p>#Chan1</p>
                <p>#Chan2</p>
                <p>#Chan3</p>
                <p>#Chan4</p>
            </div>
            <div id="users">

            </div>
        </div>
        <div id="chat_zone">
            Chat Zone
        </div>
    </div>

</html>
*/
}

export default ChatInputBar;