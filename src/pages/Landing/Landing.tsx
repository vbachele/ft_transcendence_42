import { PrimaryButton } from 'components/Buttons';
import { H1Title, Subtitle } from 'components/Text';
import { storeFirstNicknameDataBase } from 'components/UpdateNickname/db_updatenickname';
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar/-Notlogged';
import Toggle from 'components/Navbar/components/Toggle';

const LandingPage = () => {
	const handleChange = () => {
		storeFirstNicknameDataBase();
	};

	return (
		<div>
			<p>Landing page</p>
			{/* <div className='InfosContainer'>
				<div className="InfosContainer--TextLayout">
					<H1Title>Welcome to PONG</H1Title>
					<Subtitle>Insert subtitle</Subtitle>
				</div>
				<Link to="/registration-page">
					<PrimaryButton
						className='InfosContainer--PlayButton'
						onClick={handleChange}
					>Play
					</PrimaryButton>
				</Link>
			</div> */}
		</div>
	);
};

export default LandingPage;
