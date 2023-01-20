import { Button, Modal } from 'antd';
import NavLogged from 'components/NavBar/logged/Navbar';
import Popup from 'components/Popup/popupLogout';
import React from 'react';
import Qrcode from 'assets/qrcode.png';

const AuthenticationPopup = () => {
	return (
		<>
			<Popup
				click={true}
				title="Enable 2FA"
				stringPrimaryButton="Enable"
				cancelString="cancel"
				linkTo="/login-page"
				srcImage={Qrcode}
				subtitle="Scan the QRCode to enable 2FA"
			/>
		</>
	);
};

export default AuthenticationPopup;
