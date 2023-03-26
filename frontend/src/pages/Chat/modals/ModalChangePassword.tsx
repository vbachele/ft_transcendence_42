import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import styled from 'styled-components';
import * as F from 'styles/font.styles';
import {AiTwotoneLock} from "react-icons/ai";
import * as S from '../components/components.styles';
import { ILobby } from 'contexts/Chat/context';
import { backend } from 'lib/backend';




interface IProps {
	click: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement| HTMLAnchorElement>;
	activeLobby: ILobby;
}


const StyledPasswordInput = styled(Input.Password)`
	padding: 16px;
	font-size: 1.25em;
`;

const ModalChangePassword= ({click, onClose, activeLobby}:IProps) => {
const [isModalOpen, setIsModalOpen] = useState(true);
const [form] = Form.useForm();
const [error, setError] = useState<boolean>(false);


const handleCancel = (event : React.MouseEvent<HTMLButtonElement>) => {
    onClose(event);
	setIsModalOpen(false);
};

async function handleSubmit(data: any) {    
    const confirm = await backend.changePassword(data.password, activeLobby.name);    
    if (confirm.statusCode === 400)
    {
      setError(true);
      return ;
    }
	setIsModalOpen(false);
}

  const handleClick = (event: any) => {
    event.stopPropagation();
  };


  return (
	<S.ModalContainer onClick={handleClick}>
	<Modal
	centered
	width={'393px'}
	onCancel={handleCancel}
	open={isModalOpen}
	onOk={form.submit}
	title= {
		<div style={{display: 'flex'}}>
		<AiTwotoneLock style={{ marginRight: '10px', height:'34px', width:'24px' }}/>
		 <h2 color={'black'}>
			Change the password
		 </h2>
		</div>}
	 footer={[
		<Button key="back" style={{border: 'none'}} onClick={onClose}>
		  Cancel
		</Button>,
		<Button key="Confirm" onClick={() => form.submit()}>
		  Confirm
		</Button>
	  ]}
	>
	<Form form={form} layout={'vertical'} onFinish={handleSubmit}>
	<F.Subtitle style={{fontWeight: 500, marginBottom: '8px'}}> Modify the password for {activeLobby.name} </F.Subtitle>
	{error && <F.H5 style={{fontWeight: 500, marginBottom: '8px', color: '#dc4f19'}}> Error to update the password </F.H5> }
	<Form.Item
		name={'password'}
		rules={[{required: true, message: 'You have to put at least 1 letter'}]}
	>
		<StyledPasswordInput  style={{marginTop: "10px"}} placeholder="Enter a new password" />
		</Form.Item>
	</Form>	
	</Modal>
	</S.ModalContainer>
  )
}

export default ModalChangePassword