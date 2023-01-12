import BackButton from 'components/Buttons/BackButton';
import Nav from 'components/Navbar/Notlogged';
import { H2Title, NormalText, Subtitle } from 'components/Text';
import React, { useRef, useState } from 'react';
import { SecondaryButton } from 'components/Buttons';
import { UploadAvatar } from 'components/UploadAvatar';
import UpdateNickname from 'components/UpdateNickname';
import './index.css';

const RegistrationPage = () => {
	return (
		<div className="RegistrationPage">
			<Nav></Nav>
			<BackButton></BackButton>
			<div className="CreateYourProfile">
				<H2Title >Create Your Profile</H2Title>
				<Subtitle display="none">Insert subtitle</Subtitle>
				<UploadAvatar></UploadAvatar>
				<UpdateNickname ></UpdateNickname>
			</div>
		</div>
	)
}

export default RegistrationPage
