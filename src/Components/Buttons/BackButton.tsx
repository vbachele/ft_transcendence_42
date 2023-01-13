import React from 'react'
// import styles from "Components/Buttons"
import { Link } from 'react-router-dom'
import { NormalText } from 'components/Text'
import './BackButton.css'
import {BsChevronLeft} from "react-icons/bs";

const BackButton = () => {
  return (
	<Link to="/" style={{textDecoration: 'none'}}>
		<div className="BackButton--Layout">
			<BsChevronLeft className="BackButton--Layout--Icon"/>
			<NormalText string='none'>Back</NormalText>
		</div>
	</Link>
  )
}

export default BackButton