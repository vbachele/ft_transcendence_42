import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from "./Context";

export interface ISocketContextComponentProps extends PropsWithChildren {};

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;

    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);

    const socket = useSocket('ws://localhost:3000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false,
    });

    useEffect(() => {
        socket.connect();
        SocketDispatch({ type: 'update_socket', payload: socket});
        StartListeners();
        SendHandshake();
    }, [])

    const StartListeners = () => {
        socket.io.on('reconnect', (attempt) => {
            console.info(`Reconnected on attempt: `, attempt);
        })
        socket.io.on('reconnect_attempt', (attempt) => {
            console.info(`Reconnection attempt: `, attempt);
        })
        socket.io.on('reconnect_error', (error) => {
            console.error(`Reconnection error: `, error);
        })
        socket.io.on('reconnect_failed', () => {
            alert(`We are unable to connect you to the websocket.`);
        })
    };
    const SendHandshake = () => {
        console.info(`Sending handshake to server...`);

        socket.emit('handshake');
        socket.on('handshake', (uid: string, users: string[]) => {
            console.log('User handshake callback message received');
            SocketDispatch({ type: 'update_uid', payload: uid });
            SocketDispatch({ type: 'update_users', payload: users});

            setLoading(false);
            console.info(`Handshake completed.`)
        })
    };

    useEffect(() => {

        socket.on('user_connected', (users: string[]) => {
            console.log(`New user connected.`);
            SocketDispatch({ type: 'update_users', payload: users });
        })

        socket.on('disconnect', (uid: string) => {
            console.info('User disconnected');
            SocketDispatch({ type: 'remove_user', payload: uid });
        })

        socket.on('user_disconnected', (users: string[]) => {
            console.log(`A user has disconnected`)
            SocketDispatch({ type: 'update_users', payload: users});
        })
    }, [])

    if (loading) return <p>Loading socket IO...</p>

    return <SocketContextProvider value={{ SocketState, SocketDispatch }}>
        {children}
    </SocketContextProvider>
}

export default SocketContextComponent;