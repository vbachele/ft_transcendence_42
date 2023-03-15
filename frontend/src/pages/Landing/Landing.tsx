import {useState} from 'react';
import logo from 'assets/logo-text.svg';
import * as S from './Landing.styles';

const Landing = () => {
	const [click, setClick] = useState(false);
	const Oauth42 = () => {
		setClick(!click);
		let url = `${import.meta.env.VITE_AUTH42_URL}`;
		window.open(url, '_self');
	};

	return (
		<S.Container>
			<S.Background autoPlay loop muted playsInline>
				<source
					src="https://cdn.discordapp.com/attachments/1067488107827576916/1067743308367020092/background.mp4"
					type="video/mp4"
				/>
			</S.Background>
			<S.BrandContainer>
				<S.Logo src={logo} />
				<S.Slogan>Two sides, one victory</S.Slogan>
			</S.BrandContainer>
			<S.JoinButton onClick={Oauth42}>
				<S.BoldYellow>JOIN THE BATTLE</S.BoldYellow>
			</S.JoinButton>
		</S.Container>
	);
};

export default Landing;
