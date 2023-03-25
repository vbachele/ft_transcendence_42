import { Button, Form, Modal } from "antd";
import { ILobby } from "contexts/Chat/context";
import { backend } from "lib/backend";
import { useState } from "react";
import * as S from '../components/components.styles';
import * as F from 'styles/font.styles';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';


interface IProps {
	click: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement| HTMLAnchorElement>;
	activeLobby: ILobby;
}

const StyledTextArea = styled(TextArea)`
	/* background-color: transparent; */
`;

const ModalChangeDescription = ({click, onClose, activeLobby}:IProps) => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [form] = Form.useForm();
	const [error, setError] = useState<boolean>(false);

	const handleClick = (event: any) => {
		event.stopPropagation();
	  };

	const handleCancel = (event : React.MouseEvent<HTMLButtonElement>) => {
		onClose(event);
		setIsModalOpen(false);
	};
	
	async function handleSubmit(data: any) {    
		const confirm = await backend.changeDescription(data.description, activeLobby.name);    
		if (confirm.statusCode === 400)
		{
		  setError(true);
		  return ;
		}
		setIsModalOpen(false);
	}

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
		 <h2 color={'black'}>
			Change the description
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
	<F.Subtitle style={{fontWeight: 500, marginBottom: '8px'}}> for the channel {activeLobby.name} </F.Subtitle>
	{error && <F.H5 style={{fontWeight: 500, marginBottom: '8px', color: '#dc4f19'}}> Error to update the description </F.H5> }
	<Form.Item
		name={'description'}
		rules={[{required: true, message: 'Missing channel description'}]}
	>
		<StyledTextArea
						placeholder="Channel description..."
						maxLength={256}
						autoSize={{minRows: 3, maxRows: 5}}
						size={'large'}
					/>
		</Form.Item>
	</Form>	
	</Modal>
	</S.ModalContainer>
  )
}

export default ModalChangeDescription