import React, { useContext, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import * as F from 'styles/font.styles';
import styled from 'styled-components';
import { backend } from 'lib/backend';
import { ChannelName } from '../components/components.styles';
import { useJoinLobby } from 'hooks/chat/useJoinLobby';
import {ClientEvents} from '../../../events/socket.events';
import SocketContext from '../../../contexts/Socket/context';
import ChatContext, { ILobby } from '../../../contexts/Chat/context';


interface IProps {
  click: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement| HTMLAnchorElement>;
  lobby: any;
}

const StyledPasswordInput = styled(Input.Password)`
	padding: 16px;
	font-size: 1.25em;
	/* .ant-input {
		background-color: transparent;
	} */
`;

const ModalChanPass: React.FC<IProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false);
  const {joinLobby} = useJoinLobby();
  const {socket} = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;

	const handleOk = async () => {
		// try {
		// 	const res = await socket?.emitWithAck(ClientEvents.JoinLobby, {
		// 		lobbyId: lobby.id,
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// }
		// socket?.on(error, (data) => {
		// 	if (data.error === 'password') {
		// 		console.log('wrong password');
		// 	} else {
	// 			ChatDispatch({type: 'update_user_panel', payload: false});
	// 		}
	// 		setIsModalOpen(false);
	// 	});
	// 	if (password === 'ok') {
	// 		socket?.emit(ClientEvents.JoinLobby, {lobbyId: lobby.id});
	// 	}
	};

  const handleCancel = (event : React.MouseEvent<HTMLButtonElement>) => {
    props.onClose(event);
    setIsModalOpen(false);
  };

  async function handleSubmit(data: any) {    
    const confirm = await backend.checkPassword(data.password, props.lobby.name);    
    if (confirm.statusCode === 400)
    {
      setError(true);
      return ;
    }
    		socket?.emit(ClientEvents.JoinLobby, {lobbyId: props.lobby.id});
				ChatDispatch({type: 'update_user_panel', payload: false});
    setIsModalOpen(false);
  }

  return (
    <>
      <Modal 
		    title= {
          <div style={{display: 'flex'}}>
           <h2 color={'black'}>
               {props.lobby.name.substring(0, 14)}
               {props.lobby.name.length > 14 && '...'}
           </h2>
          </div>}
        centered
        width={'393px'}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" style={{border: 'none'}} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="Confirm" onClick={() => form.submit()}>
            Confirm
          </Button>
        ]}
        >
        <Form form={form} layout={'vertical'} onFinish={handleSubmit}>
            <p style={{marginBottom: '24px', marginTop: '16px'}}> This channel is protected by a password.</p>
            <F.H5 style={{fontWeight: 500, marginBottom: '8px'}}> Password </F.H5>
            {error && <F.H5 style={{fontWeight: 500, marginBottom: '8px', color: '#dc4f19'}}> This password is incorrect </F.H5> }

            <Form.Item
						  name={'password'}
						  rules={[{required: true, message: 'Password incorrect'}]}
				  	>
						  <StyledPasswordInput placeholder="Enter a password" />
					</Form.Item>
          </Form>        
      </Modal>
    </>
  );
};

export default ModalChanPass;
