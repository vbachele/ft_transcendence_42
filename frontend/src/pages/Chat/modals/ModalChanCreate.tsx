import React, {useContext, useState} from 'react';
import {Form, Input, Modal, Switch} from 'antd';
import styled from 'styled-components';
import Lock from '../assets/Lock';
import {ClientEvents} from '../../../events/socket.events';
import SocketContext from '../../../contexts/Socket/context';
import TextArea from 'antd/es/input/TextArea';
import {useUserInfos} from '../../../contexts/User/userContent';

const StyledTogglePrivate = styled.div`
	display: flex;
	width: 100%;
	flex: 1 1 auto;
	justify-content: space-between;

	.toggle {
		flex: 1 1 auto;
	}
`;

const Header = styled.div`
	display: flex;
`;

interface TogglePrivateProps {
	isPrivate: boolean;
	setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
}

function TogglePrivate({isPrivate, setIsPrivate}: TogglePrivateProps) {
	function onChange(checked: boolean) {
		setIsPrivate(checked);
	}

	return (
		<StyledTogglePrivate>
			<Header>
				<Lock />
				<h4 style={{marginLeft: '5px'}}>Private Channel</h4>
			</Header>
			<Switch checked={isPrivate} onChange={onChange} />
		</StyledTogglePrivate>
	);
}

const StyledPasswordInput = styled(Input.Password)`
	padding: 16px;
	font-size: 1.25em;
	/* .ant-input {
		background-color: transparent;
	} */
`;

const StyledInput = styled(Input)`
	padding: 16px;
	font-size: 1.25em;
	/* background-color: transparent;
	.ant-input {
		background-color: transparent;
	} */
`;

const StyledTextArea = styled(TextArea)`
	/* background-color: transparent; */
`;

interface ModalChanCreateProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalChanCreate({isModalOpen, setIsModalOpen}: ModalChanCreateProps) {
	const [isPrivate, setIsPrivate] = useState(false);
	const [form] = Form.useForm();
	const {socket} = useContext(SocketContext).SocketState;
	const name = useUserInfos().userName.userName;

	const handleCancel = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsModalOpen(false);
	};

	function handleSubmit(data: any) {
		console.log("prout");
		
		const response = socket?.emit(ClientEvents.CreateLobby, {
			type: 'chat',
			data: {
				maxClients: 1024,
				owner: name,
				privacy: data.password ? 'private' : 'public',
				init: 'true',
				type: 'channel',
				...data,
			},
		});
		console.log('RESPONSE IS', response);
		
		console.info(`Channel created`);
		setIsModalOpen(false);
	}

	return (
		<Modal
			title={<h1>Create channel</h1>}
			centered
			width={'393px'}
			open={isModalOpen}
			onOk={form.submit}
			onCancel={handleCancel}
		>
			<Form form={form} layout={'vertical'} onFinish={handleSubmit}>
				<Form.Item
					name={'name'}
					label={'Channel name'}
					rules={[{required: true, message: 'Missing channel name'}]}
				>
					<StyledInput prefix={'#'} placeholder="new-channel" />
				</Form.Item>
				<Form.Item
					name={'description'}
					label={'Description'}
					rules={[{required: true, message: 'Missing channel description'}]}
				>
					<StyledTextArea
						placeholder="Channel description..."
						maxLength={256}
						autoSize={{minRows: 3, maxRows: 5}}
						size={'large'}
					/>
				</Form.Item>
				<TogglePrivate isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
				{isPrivate && (
					<Form.Item
						name={'password'}
						label={'Password'}
						rules={[{required: true, message: 'Missing channel password'}]}
					>
						<StyledPasswordInput placeholder="Enter a password" />
					</Form.Item>
				)}
			</Form>
		</Modal>
	);
}
export default ModalChanCreate;
