import { PrimaryButton } from 'components/Buttons'
import NavLogged from 'components/Navbar/Logged'
import { H1Title, Subtitle } from 'components/Text'
import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
	<div className = "LoginPage">
	<NavLogged></NavLogged>
      <div className='InfosContainer'>
        <div className="InfosContainer--TextLayout">
          <H1Title>FIRE PONG</H1Title>
          <Subtitle>Push play to be sent to hell</Subtitle>
        </div>
        {/* <Link to="/LandingPage"> */}
			<PrimaryButton className='InfosContainer--PlayButton'>Play</PrimaryButton>
		{/* </Link>  */}
	</div>
    </div>
  )
}

export default LoginPage
