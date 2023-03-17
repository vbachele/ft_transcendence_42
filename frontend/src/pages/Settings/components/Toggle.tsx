import useComponentVisible from 'hooks/useComponentVisible';
import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {useState} from 'react';
import {notification, Switch} from 'antd';
import QRCode from 'qrcode';
import Disable2FA from './Disable2FA';
import Popup from './Popup';
import * as F from 'styles/font.styles';
import * as S from '../Settings.styles';

const Toggle = () => {
	const {userName, doubleAuth} = useUserInfos();
	const [QRCodeURL, setQRCodeURL] = useState('');
	const [secretKey, setSecretKey] = useState('');

	const handleToggle = async () => {
		const generate = await backend.generate2FA(userName);
		QRCode.toDataURL(generate.otpauth_url).then(setQRCodeURL);
		setSecretKey(generate.base32);
		setIsOpen(!isOpen);
	};

	const {
		ref: popupRef,
		isComponentVisible: isOpen,
		setIsComponentVisible: setIsOpen,
	} = useComponentVisible(false);

	return (
		<S.Toggle ref={popupRef}>
			<Switch checked={doubleAuth.doubleAuth} onClick={handleToggle} />
			{!doubleAuth.doubleAuth && isOpen && (
				<Popup QRcode={QRCodeURL} secretKey={secretKey} setIsOpen={setIsOpen} />
			)}
			{doubleAuth.doubleAuth && isOpen && <Disable2FA setIsOpen={setIsOpen} />}
			{!doubleAuth.doubleAuth && <F.Text>Enable 2FA</F.Text>}
			{doubleAuth.doubleAuth && <F.Text>Disable 2FA</F.Text>}
		</S.Toggle>
	);
};

export default Toggle;
