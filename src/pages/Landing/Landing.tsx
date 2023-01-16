import {Link} from 'react-router-dom';
import * as UI from 'styles/buttons.styles';
import * as F from 'styles/font.styles';
import * as S from './Landing.styles';
import {storeFirstNicknameDataBase} from 'components/UpdateNickname/db_updatenickname';
import {ReactComponent as Logo} from 'assets/versus.svg';

const Landing = () => {
	const handleChange = () => {
		storeFirstNicknameDataBase();
	};

	return (
		<S.Container>
			<Logo />
			<F.H2>Two sides, one victory</F.H2>
			<S.ButtonsContainer>
				<UI.PrimaryButton onClick={handleChange}>
					<Link to="/registration">Join the battle</Link>
				</UI.PrimaryButton>
				<UI.SecondaryButtonSmall>
					<Link to="/spectate">Watch games</Link>
				</UI.SecondaryButtonSmall>
			</S.ButtonsContainer>
		</S.Container>
	);
};

export default Landing;
