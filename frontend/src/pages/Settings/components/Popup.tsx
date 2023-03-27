import {ChangeEventHandler, useContext, useState} from 'react';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';
import {Form, Input} from 'antd';
import {openNotification} from 'helpers/openNotification';
import * as S from './Popup.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {fetchUserByName} from 'helpers/fetchUserByName';
import SocketContext from 'contexts/Socket/context';
import unlockAchievement from 'helpers/unlockAchievement';

interface IProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	email: string;
}

const DoubleAuthPopup = ({setIsOpen, email}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName, setDoubleAuth, setAchievements} = useUserInfos();
	const [errorCode, setErrorCode] = useState(false);
	const [verifyCode, setVerifyCode] = useState('');

	const handleFormPhone: ChangeEventHandler<HTMLInputElement> = (e) => {
		setVerifyCode(e.target.value);
	};

	async function handleSubmitCode() {
		const data = await fetchUserByName(userName.userName, userName.userName);
		const hasAuthAchievement = data?.achievements.includes('2FA');
		const userForm = {
			userName,
			token: verifyCode,
		};
		const response = await backend.verify2FA(userForm);
		if (response.status === 'fail') {
			console.error(response.message);
			setErrorCode(true);
			return;
		}
		setDoubleAuth({doubleAuth: true});
		setIsOpen(false);
		openNotification('success', '2FA enabled');

		if (data && !hasAuthAchievement) {
			unlockAchievement('2FA', data, socket);
			setAchievements({achievements: [...data.achievements]});
		}
	}

	return (
		<S.Container>
			<S.Title>
				<S.GIF src="https://cdn.discordapp.com/attachments/1067488107827576916/1069217769515651132/Rectangle.gif" />
				<F.H2>Enable 2FA</F.H2>
			</S.Title>
			<F.Subtitle>An email with a code has been sent to {email}</F.Subtitle>
			<S.Divider />
			<F.Subtitle>Enter the 6 digit code</F.Subtitle>
			<Form name="basic" onFinish={handleSubmitCode}>
				<Form.Item
					name="code"
					rules={[
						{
							required: true,
							message: 'Please enter your code',
						},
						{type: 'string', max: 6},
					]}
				>
					<Input
						placeholder="6 digit code"
						maxLength={10}
						onChange={handleFormPhone}
						style={{
							background: 'rgba(249, 249, 249, 0.5)',
							padding: '16px 8px',
						}}
					/>
				</Form.Item>
				{errorCode && (
					<F.Subtitle
						style={{
							color: '#ff4d4f',
							textAlign: 'left',
							marginBottom: 16,
							marginTop: -16,
						}}
					>
						Your code is wrong
					</F.Subtitle>
				)}
				<div style={{display: 'flex', gap: '32px', justifyContent: 'center'}}>
					<Form.Item>
						<UI.PrimaryButton>Confirm</UI.PrimaryButton>
					</Form.Item>
				</div>
			</Form>
		</S.Container>
	);
};

export default DoubleAuthPopup;
