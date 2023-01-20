import EditAvatar from 'components/EditAvatar';
import EditName from 'components/EditName';
import * as F from 'styles/font.styles';
import * as S from './Settings.styles';
import Toggle from './2FA/toggle';

const Settings = () => {
	return (
		<>
			<S.Container>
				<F.H2>Settings</F.H2>
				<F.Subtitle>Manage your information and security</F.Subtitle>
				<EditAvatar />
				<EditName />
				{/* <Toggle name="Enable double authentication" /> */}
			</S.Container>
		</>
	);
};

export default Settings;
