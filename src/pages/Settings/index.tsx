import './styles.css';
import {H2, Text, Subtitle} from 'styles/font.styles';
import React, {ChangeEventHandler, useContext, useState} from 'react';
import UploadAvatar from 'components/UploadAvatar';
import FieldNickname from 'components/UpdateNickname/input/index';

const Settings = () => {
	return (
		<>
			<div className="settings">
				<H2>Settings</H2>
				<Subtitle display="none">Manage your information and security</Subtitle>
				<UploadAvatar></UploadAvatar>
				<FieldNickname></FieldNickname>
			</div>
		</>
	);
};

export default Settings;
