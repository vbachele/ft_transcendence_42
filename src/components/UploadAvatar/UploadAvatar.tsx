import {Camera} from 'components/UploadAvatar/UploadIcon';
import DefaultAvatar from './assets/default-avatar.png';
import UserAvatarIcon from 'components/UploadAvatar/Avatar';
import * as F from 'styles/font.styles';
import * as S from './UploadAvatar.styles';

export const UploadAvatar = () => {
	return (
		<S.Container>
			<S.AvatarContainer>
				<UserAvatarIcon src={DefaultAvatar} />
				<Camera />
			</S.AvatarContainer>
			<S.NameContainer>
				<F.Text weight="700">vbachele</F.Text>
				<F.Subtitle>Federation</F.Subtitle>
			</S.NameContainer>
		</S.Container>
	);
};

export default UploadAvatar;
