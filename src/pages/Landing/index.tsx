import { PrimaryButton } from 'components/Buttons'
import { H1Title, Subtitle } from 'components/Text'
import { storeFirstNicknameDataBase } from 'components/UpdateNickname/db_updatenickname'
import { Link } from 'react-router-dom'
import Nav from 'components/NavBar/Notlogged'

const LandingPage = () => {

	const handleChange= () =>
	{
		storeFirstNicknameDataBase();
	}
	return (
	<div className = "LandingPage">
			<Nav />
			<div className='InfosContainer'>
				<div className="InfosContainer--TextLayout">
					<H1Title>FIRE PONG</H1Title>
					<Subtitle>Insert subtitle</Subtitle>
				</div>
				<Link to="/registration-page">
			<PrimaryButton className='InfosContainer--PlayButton' onClick={handleChange}>Play</PrimaryButton>
		</Link>
	</div>
		</div>
	)
}

export default LandingPage
