import {SecondaryButton} from 'components/Buttons/Buttons.styles';
import {NormalText} from 'styles/font.styles';
import React, {ChangeEventHandler, useRef, useState} from 'react';
import styled from 'styled-components';

const NicknameForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UpdateNicknameLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	padding: 0px;
	gap: 10px;
	padding-top: 40px;
	padding-bottom: 56px;

	height: 70px;

	/* Inside auto layout */

	align-self: stretch;
	@media only screen and (max-width: 768px) {
		padding-top: 10px;
		padding-bottom: 80px;
	}
`;

const UpdateNicknameLayout__Input = styled.input`
	width: 394px;
	height: 50px;

	/* Text box */
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 28px;
	/* Inside auto layout */

	flex: none;
	order: 1;
	align-self: stretch;
	flex-grow: 1;
	background: #f9f9f9;
	border: 1px solid #e6e6e6;
	border-radius: 5px;
	padding-left: 24px;

	/* Here I define the css of my placeholder */
	::placeholder {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 28px;
	}
	@media only screen and (max-width: 768px) {
		width: 320px;
		height: 50px;
	}
`;

const UpdateNickname = () => {
	const [value, setValue] = useState('');

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setValue(event.target.value);
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		console.log(value);
	};

	return (
		<NicknameForm className="NicknameForm" onSubmit={handleSubmit}>
			<UpdateNicknameLayout>
				<NormalText fontWeight={'600'} fontSize={'14px'}>
					Choose a Nickname *
				</NormalText>
				<UpdateNicknameLayout__Input
					type="text"
					value={value}
					onChange={handleChange}
					placeholder="ex: VincentCollègueShadow"
					maxLength={8}
					minLength={2}
				/>
			</UpdateNicknameLayout>
			<SecondaryButton type="submit">Continue</SecondaryButton>
		</NicknameForm>
	);
};

export default UpdateNickname;
