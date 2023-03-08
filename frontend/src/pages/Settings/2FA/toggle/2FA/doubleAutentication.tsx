import React, {ChangeEventHandler, Component, useState} from 'react';
import {PopupButton} from 'styles/buttons.styles';
import {Text, H2} from 'styles/font.styles';
import * as S from './doubleAutentication.styles';

interface Props {
	click: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement>;
}

function stopPropagation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.stopPropagation();
}

// BACKEND retrieve information from the backend
const DoubleAutentication: React.FC<Props> = (props) => {
	// set up variables
	const DoubleAuthEnabled: boolean = false;
	if (!props.click) return null;

	// 2FA DISABLED - USER ENTERS HIS NUMBER
	function AddPhoneNumber() {
		const [phoneNumber, setPhoneNumber] = useState('');

		const handleFormPhone: ChangeEventHandler<HTMLInputElement> = (e) => {
			setPhoneNumber(e.target.value);
		};
		function handleSubmitPhone(event: React.FormEvent<HTMLFormElement>) {
			event.preventDefault();
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
					<Text style={{textAlign: 'center'}} weight={'350'} fontSize="1rem">
						Enter your phone number to enable 2FA
					</Text>
				</S.Text>
				<S.FormNumber key="phone" onSubmit={handleSubmitPhone}>
					<S.Input
						key="phone"
						type="text"
						value={phoneNumber}
						onChange={handleFormPhone}
						onKeyPress={handleKeyPress}
						placeholder="Ex: 0665156514"
						required
					/>
					<Buttons />
				</S.FormNumber>
			</S.Overlay__Container>
		);
	}

	// 2FA DISABLE - ASKING USER IF HE WANTS TO ENABLE IT
	function Disable2FA() {
		return (
			<S.Overlay__Container onClick={(e) => stopPropagation(e)}>
				<S.Text>
					<H2 style={{textAlign: 'center'}}>Disable 2FA</H2>
					<Text style={{textAlign: 'center'}} weight={'350'} fontSize="1rem">
						Are you sure ?
					</Text>
				</S.Text>
				<Buttons />
			</S.Overlay__Container>
		);
	}

	// BUTTONS OF THE POPUP
	function Buttons() {
		return (
			<S.Button>
				<PopupButton
					className="logout"
					backgroundColor={'#dc4f19'}
					// onClick={() => handleClick()}
				>
					{DoubleAuthEnabled && <Text weight="500"> Disable </Text>}
					{!DoubleAuthEnabled && <Text weight="500"> Confirm </Text>}
				</PopupButton>
			</S.Button>
		);
	}

	// MAIN FUNCTION
	return (
		<S.Overlay>
			{!DoubleAuthEnabled && <AddPhoneNumber />}
			{DoubleAuthEnabled && <Disable2FA />}
		</S.Overlay>
	);
};

export default DoubleAutentication;
