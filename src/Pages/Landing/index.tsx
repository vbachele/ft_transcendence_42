import { PrimaryButton } from 'components/Buttons'
import Nav from 'components/NavBar/Notlogged'
import { H1Title, Subtitle } from 'components/Text'
import { storeFirstNicknameDataBase } from 'components/UpdateNickname/db_updatenickname'
import { Link } from 'react-router-dom'

const LandingPage = () => {

  const handleChange= () =>
  {
    storeFirstNicknameDataBase();
  }
  return (
	<div className = "LandingPage">
      <Nav></Nav>
      <div className='InfosContainer'>
        <div className="InfosContainer--TextLayout">
          <H1Title>FIRE PONG</H1Title>
          <Subtitle>Votre anus va finir en feu</Subtitle>
        </div>
        <Link to="/registration-page" style={{textDecoration: 'none'}}>
			<PrimaryButton className='InfosContainer--PlayButton' onClick={handleChange}>Play</PrimaryButton>
		</Link> 
	</div>
    </div>
  )
}

export default LandingPage