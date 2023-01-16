import React, {Component} from 'react';
import {H1, Text} from 'styles/font.styles';
import {BsFillPersonFill} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import DarkMode from 'components/-DarkMode';
import styles from 'components/Navbar/Navbar.module.css';

function IconLayout() {
	return (
		<Link to="/registration-page">
			<div className={styles.LoginLayout}>
				<BsFillPersonFill className={styles.LoginIcon} />
				<Text fontSize={'20px'} fontWeight={'600'}>
					Log in
				</Text>
			</div>
		</Link>
	);
}

function Divider(divider: string) {
	return <div className={styles[divider]}></div>;
}

// In this funtion I split the links of my menu to put the layout according to the design
// There are: Darkmode (call DarkMode component), divider, Spectate, Icons
export const MenuNonLogged = () => {
	return (
		<div className={styles['links-containers']}>
			<div>{DarkMode()}</div>
			<div>{Divider('Divider1')}</div>
			<Text fontSize={'20px'} fontWeight={'600'} string={'none'}>
				Spectate
			</Text>
			<div>{Divider('Divider2')}</div>
			<div>{IconLayout()}</div>
		</div>
	);
};

const NavNonLogged: React.FC<{}> = () => {
	return (
		<nav className={styles.navbar}>
			<H1 fontSize={'36px'} fontWeight={'600'}>
				PONG
			</H1>
			<MenuNonLogged />
		</nav>
	);
};

export default NavNonLogged;
