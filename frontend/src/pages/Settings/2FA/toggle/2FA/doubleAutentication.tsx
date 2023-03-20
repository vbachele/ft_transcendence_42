import React, {ChangeEventHandler, Component, useState} from 'react';
import {PopupButton} from 'styles/buttons.styles';
import {Text, H2, Subtitle} from 'styles/font.styles';
import * as S from './doubleAutentication.styles';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';

interface Props {
	click: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement>;
	Email: string;
}

function stopPropagation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.stopPropagation();
}

// BACKEND retrieve information from the backend
const DoubleAutentication: React.FC<Props> = (props) => {
	const {userName, setDoubleAuth, doubleAuth} = useUserInfos();
	const [errorCode, setErrorCode] = useState(false);

	// set up variables

	function Add2FA() {
		const [verifyCode, setVerifyCode] = useState('');
		const handleFormPhone: ChangeEventHandler<HTMLInputElement> = (e) => {
			setVerifyCode(e.target.value);
		};

		async function handleSubmitCode(event: React.FormEvent<HTMLFormElement>) {
			props.onClose;
			event.preventDefault();
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
			props.onClose;
		}

		function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
			if (event.currentTarget.value.length === 10) {
				event.preventDefault();
			}
		}

		return (
			<S.Overlay__Container onClick={(e) => stopPropagation(e)}>
				<S.Text>
					<S.TitleGif>
						<S.GiFFire src="https://cdn.discordapp.com/attachments/1067488107827576916/1069217769515651132/Rectangle.gif" />
						<H2>Enable 2FA</H2>
					</S.TitleGif>
					<Text style={{textAlign: 'center'}} weight={'450'} fontSize="1rem">
						An email with a code has been sent to {props.Email} 
					</Text>
					<S.divider></S.divider>
					<Text style={{textAlign: 'center'}} weight={'500'} fontSize="1rem">
					 	Enter the 6 digit code
					</Text>
				</S.Text>
				<S.FormNumber key="phone" onSubmit={handleSubmitCode}>
					<S.Input
						key="phone"
						type="text"
						value={verifyCode}
						onChange={handleFormPhone}
						onKeyPress={handleKeyPress}
						placeholder="Ex: 066578"
						required
					/>
					{errorCode && (
						<Subtitle
							style={{color: '#E04F5F', textAlign: 'center'}}
							weight={'350'}
							fontSize="1rem"
						>
							Your code is wrong
						</Subtitle>
					)}
					<Buttons />
				</S.FormNumber>
			</S.Overlay__Container>
		);
	}

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
		props.onClose;
		unlockAchievement('2FA', userName.userName);
	};

	// BUTTONS OF THE POPUP
	function Buttons() {
		return (
			<S.Button>
				<PopupButton
					className="ActivateDoubleAuth"
					backgroundColor={'#DC4F19'}
					onClick={handleClick}
				>
					<Text weight="500"> Confirm </Text>
				</PopupButton>
			</S.Button>
		);
	}

	// MAIN FUNCTION
	return (
		<S.Overlay>
			<Add2FA />
		</S.Overlay>
	);
};

export default DoubleAutentication;
