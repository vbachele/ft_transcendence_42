import {PrimaryButton} from 'components/Buttons';
import {storeFirstNicknameDataBase} from 'components/UpdateNickname/db_updatenickname';
import {Link} from 'react-router-dom';
import {Container} from './Landing.styles';

const LandingPage = () => {
	const handleChange = () => {
		storeFirstNicknameDataBase();
	};

	return (
		<Container>
			<h1>Versus</h1>
			<h3>Two sides, one victory</h3>
			<Link to="/registration-page">
				<PrimaryButton
					className="InfosContainer--PlayButton"
					onClick={handleChange}
				>
					Play
				</PrimaryButton>
			</Link>
		</Container>
		// <div>
		// 	<p>Landing page</p>
		//  <div className='InfosContainer'>
		// 		<div className="InfosContainer--TextLayout">
		// 			<H1Title>Welcome to PONG</H1Title>
		// 			<Subtitle>Insert subtitle</Subtitle>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default LandingPage;
