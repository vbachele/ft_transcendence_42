import {PrimaryButton} from 'components/Buttons/Buttons.styles';
import {H1Title, Subtitle} from 'styles/font.styles';
import React from 'react';
import {Link} from 'react-router-dom';

const LoginPage = () => {
	return (
		<div className="LoginPage">
			<div className="InfosContainer">
				<div className="InfosContainer--TextLayout">
					<H1Title>FIRE PONG</H1Title>
					<Subtitle>Push play to be sent to hell</Subtitle>
				</div>
				{/* <Link to="/LandingPage"> */}
				<PrimaryButton className="InfosContainer--PlayButton">
					Play
				</PrimaryButton>
				{/* </Link>  */}
			</div>
		</div>
	);
};

export default LoginPage;
