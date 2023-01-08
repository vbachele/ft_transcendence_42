import React, { Component } from 'react'
import styles from 'Components/NavBar/Nav.module.css'
import {BsFillPersonFill} from "react-icons/bs";
import DarkMode from 'Components/DarkMode';
import { Link } from 'react-router-dom';
import { H1Title, NormalText } from 'Components/Text';

function IconLayout(){
	return (
		<Link to="/registration-page">
			<div className={styles.LoginLayout}>
				<BsFillPersonFill className={styles.LoginIcon} />
				<NormalText fontSize={'20px'} fontWeight={'600'}> Log in </NormalText>

			</div>
		</Link>
	);
}

function Divider(divider:string){
	return(
		<div className={styles[divider]}>
		</div>
	)
}

// In this funtion I split the links of my menu to put the layout according to the design
// There are: Darkmode (call DarkMode component), divider, Spectate, Icons
export const MenuNonLogged = () => 
{
	return (
		<div className={styles['links-containers']}>
			<div>{DarkMode()}</div> 
			<div>{Divider('Divider1')}</div>
			<NormalText fontSize={'20px'} fontWeight={'600'} string={'none'}> Spectate </NormalText>
			<div>{Divider('Divider2')}</div>
			<div>{IconLayout()}</div>
		</div>
	);
}

const NavNonLogged:React.FC<{}> = () => {
    return (
		<nav className={styles.navbar}> 
			{/* <div className={styles.logo}> PONG </div> */}
			<H1Title fontSize={'36px'} fontWeight={'600'}> PONG </H1Title>
			<MenuNonLogged/>
		</nav>
	  )
}

export default NavNonLogged