import useComponentVisible from 'hooks/useComponentVisible';
import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {useState} from 'react';
import {Switch} from 'antd';
import Disable2FA from './Disable2FA';
import Popup from './Popup';
import * as F from 'styles/font.styles';
import * as S from '../Settings.styles';

const Toggle = () => {
	const {userName, doubleAuth} = useUserInfos();
	const [email, setEmail] = useState('');

	const handleToggle = async () => {
		if (!doubleAuth.doubleAuth)
		{
			const generate = await backend.generate2FA(userName);
			setEmail(generate.email);
			setEmail(generate.email);
		}
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
				<Popup email={email} setIsOpen={setIsOpen} />
			)}
			{doubleAuth.doubleAuth && isOpen && <Disable2FA setIsOpen={setIsOpen} />}
			{!doubleAuth.doubleAuth && <F.Text>Enable 2FA</F.Text>}
			{doubleAuth.doubleAuth && <F.Text>Disable 2FA</F.Text>}
		</S.Toggle>
	);
};

export default Toggle;
