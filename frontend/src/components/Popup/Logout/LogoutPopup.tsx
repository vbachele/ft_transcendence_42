import React from 'react';
import {PopupButton} from 'styles/buttons.styles';
import {Text} from 'styles/font.styles';
import {Link} from 'react-router-dom';
import Popup from '../components/Popup/Popup';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';

interface IProps {
	click: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement>;
}

function LogoutPopup(props: IProps) {
	if (!props.click) return null;
	const {userName} = useUserInfos();

	async function handleLogout() {
		let user = {otp_validated: false};
		backend.deleteTokenCookie();
		const response = await backend.patchUser(userName.userName, user);
		if (response.status === 'fail') console.error(response.error);
	}

	return (
		<Popup title="Log out" subtitle="Already leaving paradise?" overlay={true}>
			<PopupButton
				onClick={props.onClose}
				border="1px solid #e5e7eb"
				className="Cancel"
			>
				<Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)">
					Cancel
				</Text>
			</PopupButton>
			<PopupButton className="logout" backgroundColor={'#DC4F19'}>
				<Link
					onClick={handleLogout}
					to="/login"
					style={{textDecoration: 'none'}}
				>
					<Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)">
						Log out
					</Text>
				</Link>
			</PopupButton>
		</Popup>
	);
}
export default LogoutPopup;
