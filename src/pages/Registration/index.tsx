import BackButton from 'components/Buttons/BackButton';
import {H2Title, NormalText, Subtitle} from 'styles/font.styles';
import React, {useRef, useState} from 'react';
import {SecondaryButton} from 'components/Buttons/Buttons.styles';
import {UploadAvatar} from 'components/UploadAvatar';
import UpdateNickname from 'components/UpdateNickname';
import './styles.css';

const RegistrationPage = () => {
	return (
		<div className="RegistrationPage">
			<BackButton></BackButton>
			<div className="CreateYourProfile">
				<H2Title>Create Your Profile</H2Title>
				<Subtitle display="none">insert subtitle</Subtitle>
				<UploadAvatar></UploadAvatar>
				<UpdateNickname></UpdateNickname>
			</div>
		</div>
	);
};

export default RegistrationPage;
