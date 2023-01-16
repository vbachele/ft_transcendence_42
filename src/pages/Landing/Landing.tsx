import {Link} from 'react-router-dom';
import {storeFirstNicknameDataBase} from 'components/UpdateNickname/db_updatenickname';
import {
	PrimaryButton,
	SecondaryButtonSmall,
} from 'components/Buttons/Buttons.styles';
import {H1Title, H2Title} from 'styles/font.styles';
import {ReactComponent as Logo} from 'assets/versus_flat_BW.svg';
import {ButtonsContainer, Container} from './Landing.styles';

const LandingPage = () => {
	const handleChange = () => {
		storeFirstNicknameDataBase();
	};

	return (
		<Container>
			{/* <H1Title>Versus</H1Title> */}
			<Logo />
			<H2Title>Two sides, one victory</H2Title>
			<ButtonsContainer>
				<PrimaryButton onClick={handleChange}>
					<Link to="/registration-page">Register</Link>
				</PrimaryButton>
				<SecondaryButtonSmall onClick={handleChange}>
					<Link to="/spectate">Watch games</Link>
				</SecondaryButtonSmall>
			</ButtonsContainer>
		</Container>
	);
};

export default LandingPage;
