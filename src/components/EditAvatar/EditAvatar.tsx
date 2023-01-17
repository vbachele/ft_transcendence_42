import {SelectFile} from './components/SelectFile';
import Default from './assets/default-avatar.png';
import * as F from 'styles/font.styles';
import * as S from './EditAvatar.styles';

export const EditAvatar = () => {
	return (
		<S.Container>
			<S.AvatarContainer>
				<S.Avatar src={Default} />
				<SelectFile />
			</S.AvatarContainer>
			<S.NameContainer>
				<F.Text weight="700">username</F.Text>
				<F.Subtitle>Coalition</F.Subtitle>
			</S.NameContainer>
		</S.Container>
	);
};

export default EditAvatar;
