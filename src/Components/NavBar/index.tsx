import React, { Component } from 'react'
import styles from './Nav.module.css'
import {BsFillPersonFill} from "react-icons/bs";
import * as data from "./linksmenu.json";
import { ChangeEventHandler } from "react";
import DarkMode from 'Components/DarkMode';
import { Link } from 'react-router-dom';

const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
	label:string;
	href:string;
	name:string;
}

function IconLayout(links:Link){
	return (
		<Link to="/registration-page">
			<div className={styles.LoginLayout}>
				<BsFillPersonFill className={styles.LoginIcon} />
				<span className={styles[links.label]}> Log in</span>
			</div>
		</Link>
	);
}

function Divider(links:Link){
	return(
		<div className={styles[links.label]}>
		</div>
	)
}

// In this funtion I split the links of my menu to put the layout according to the design
// There are: Darkmode (call DarkMode component), divider, Spectate, Icons
const LinkMenu:React.FC<{links: Link[]}> = ({links}) => 
{
	return (
		<div className={styles['links-containers']}>
		{
			links.map((link:Link) => {
				return(
				<div key={link.label} className={styles[link.name]}>
						<div>{link.label === 'DarkMode' && DarkMode()}</div> 
						<div>{link.label === 'Divider1' && Divider(link)}</div>
						<div>{link.label === 'Divider2' && Divider(link)}</div>
						<div>{link.label === 'Login' && IconLayout(link)}</div>
						<div>{link.name} </div>
				</div>
				)
				})
		}	
		</div>
	);
}

const Nav:React.FC<{}> = () => {
    return (
		<nav className={styles.navbar}> 
			<div className={styles.logo}> PONG </div>
			<LinkMenu links={links} />
		</nav>
	  )
}

export default Nav