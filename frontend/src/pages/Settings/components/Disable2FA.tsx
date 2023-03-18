import {notification} from 'antd';
import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import * as UI from 'styles/buttons.styles';
import * as F from 'styles/font.styles';
import * as S from './Popup.styles';

interface IProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Disable2FA = ({setIsOpen}: IProps) => {
	const {userName, setDoubleAuth} = useUserInfos();

	async function handleClick() {
		const response = await backend.disable2FA(userName);
		if (response.status === 'fail' || response.status === 'error') {
			console.error(response.message);
			return;
		}
		setDoubleAuth({doubleAuth: false});
		setIsOpen(false);

		notification.warning({
			message: <div style={{marginBottom: -8}}>2FA disabled</div>,
			placement: 'bottom',
			duration: 2.5,
		});
	}

	return (
		<S.DisableContainer>
			<div style={{textAlign: 'center'}}>
				<F.H2>Disable 2FA</F.H2>
				<F.Subtitle>Are you sure ?</F.Subtitle>
			</div>
			<UI.PopupButton backgroundColor={'#DC4F19'} onClick={handleClick}>
				Disable 2FA
			</UI.PopupButton>
		</S.DisableContainer>
	);
};

export default Disable2FA;
