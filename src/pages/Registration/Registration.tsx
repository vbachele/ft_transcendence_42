import UploadAvatar from 'components/UploadAvatar';
import UpdateNickname from 'components/UpdateNickname';
import * as F from 'styles/font.styles';
import * as S from './Registration.styles';
import './styles.css';

const Registration = () => {
	return (
		<S.Container>
			<S.Form>
				<F.H2>Create Your Profile</F.H2>
				<F.H6>insert subtitle</F.H6>
				<UploadAvatar />
				<UpdateNickname />
			</S.Form>
		</S.Container>
	);
};

export default Registration;
