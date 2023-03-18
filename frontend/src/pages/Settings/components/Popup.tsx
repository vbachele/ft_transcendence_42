import {ChangeEventHandler, useState} from 'react';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import * as S from './Popup.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {Button, Form, Input, notification} from 'antd';

interface IProps {
	QRcode: string;
	secretKey: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DoubleAuthPopup = ({QRcode, secretKey, setIsOpen}: IProps) => {
	const {userName, setDoubleAuth} = useUserInfos();
	const [errorCode, setErrorCode] = useState(false);
	const [verifyCode, setVerifyCode] = useState('');

	const handleFormPhone: ChangeEventHandler<HTMLInputElement> = (e) => {
		setVerifyCode(e.target.value);
		console.log('lds');
	};

	async function handleSubmitCode() {
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

		notification.success({
			message: <div style={{marginBottom: -8}}>2FA enabled</div>,
			placement: 'bottom',
			duration: 2.5,
		});
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(secretKey);

		notification.success({
			message: <div style={{marginBottom: -8}}>Key copied to clipboard</div>,
			placement: 'bottomRight',
			duration: 2.5,
		});
	}

	return (
		<S.Container>
			<S.Title>
				<S.GIF src="https://cdn.discordapp.com/attachments/1067488107827576916/1069217769515651132/Rectangle.gif" />
				<F.H2>Enable 2FA</F.H2>
			</S.Title>
			<F.Subtitle>1. Scan this QR code in your Google Authenticator</F.Subtitle>
			<S.QRCode src={QRcode} />
			<S.Divider />
			<F.Subtitle>
				1. Or enter this key in your application (click to copy)
			</F.Subtitle>
			<F.Text
				style={{cursor: 'pointer', wordBreak: 'break-all', textAlign: 'center'}}
				onClick={copyToClipboard}
			>
				{secretKey}
			</F.Text>
			<S.Divider />
			<F.Subtitle>2. Enter the 6 digit code</F.Subtitle>
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
