import EditAvatar from 'components/EditAvatar';
import EditName from 'components/EditName';
import Toggle from './components/Toggle';
import * as F from 'styles/font.styles';
import * as S from './Settings.styles';

const Settings = () => {
	return (
		<S.Container>
			<S.Title>
				<F.H2>Settings</F.H2>
				<F.Subtitle>Manage your informations and security</F.Subtitle>
			</S.Title>
			<S.Infos>
				<EditAvatar page="settings" />
				<Toggle />
				<EditName linkTo={''} visible={false} page="settings" />
			</S.Infos>
		</S.Container>
	);
};

export default Settings;
