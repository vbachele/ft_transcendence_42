import {useState} from 'react';
import logo from 'assets/logo-text.svg';
import * as S from './Landing.styles';
import Popup from 'components/Popup';

const Landing = () => {
	const [click, setClick] = useState(false);
	const handleClick = () => {
		setClick(!click);
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
			<S.JoinButton onClick={handleClick}>
				<S.BoldYellow>JOIN THE BATTLE</S.BoldYellow>
				{click && (<Popup.AuthPopup click={click}
                  onClose={() => setClick(false)}></Popup.AuthPopup>)}
			</S.JoinButton>
		</S.Container>
	);
};

export default Landing;
