import EditAvatar from 'components/EditAvatar';
import EditName from 'components/EditName';
import * as F from 'styles/font.styles';
import './styles.css';

const Settings = () => {
	return (
		<>
			<div className="settings">
				<F.H2>Settings</F.H2>
				<F.Subtitle>Manage your information and security</F.Subtitle>
				<EditAvatar />
				<EditName />
			</div>
		</>
	);
};

export default Settings;
