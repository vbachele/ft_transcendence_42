import {PrimaryButton} from 'styles/buttons.styles';
import {H1, Subtitle} from 'styles/font.styles';
import React from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
	return (
		<div className="LoginPage">
			<div className="InfosContainer">
				<div className="InfosContainer--TextLayout">
					<H1>FIRE PONG</H1>
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

export default Login;
