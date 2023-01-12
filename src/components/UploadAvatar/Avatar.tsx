import React from 'react'
import styled from 'styled-components'

const UserAvatarIcon = styled.img`
	width: ${props => props.width || "88px"};
	height: ${props => props.height || "80px"};
	left: 20px;
	top: 20px;
	box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

	/* Sidebar Hover Text */

	border-radius: 200px;
`

export default UserAvatarIcon