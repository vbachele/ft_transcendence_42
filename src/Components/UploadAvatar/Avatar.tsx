import React from 'react'
import styled from 'styled-components'

const UserAvatarIcon = styled.img`
	width: ${props => props.width || "88px"};
	height: ${props => props.height || "80px"};
	left: 20px;
	top: 20px;
	/* Sidebar Hover Text */

	border-radius: 200px;
`

export default UserAvatarIcon