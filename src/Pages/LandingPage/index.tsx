import { PrimaryButton } from 'Components/Buttons'
import Nav from 'Components/NavBar'
import { H1Title, Subtitle } from 'Components/Text'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
	<div className = "LandingPage">
      <Nav></Nav>
      <div className='InfosContainer'>
        <div className="InfosContainer--TextLayout">
          <H1Title>FIRE PONG</H1Title>
          <Subtitle>Votre anus va finir en feu</Subtitle>
        </div>
        <Link to="/registration-page">
			<PrimaryButton className='InfosContainer--PlayButton'>Play</PrimaryButton>
		</Link> 
	</div>
    </div>
  )
}

export default LandingPage