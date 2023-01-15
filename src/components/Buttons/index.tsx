import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 14px 40px;
	border-radius: 37px;
	font-family: 'Montserrat';
	font-style: normal;
	font-size: 16px;
	font-weight: 700;
	line-height: 28px;
	border: 1px solid #e04f5f;
	a {
		text-decoration: none;
	}
`;

export const PrimaryButton = styled(Button)`
	background-color: #e04f5f;
	width: 132px;
	height: 56px;
	color: #ffffff;
	letter-spacing: 0.2px;
`;

export const SecondaryButton = styled(Button)`
	width: 159px;
	height: 56px;
	background-color: #FFFFFF;
	gap: 10px;
	color: #E04F5F;
	align-items: left;
	submit =
`;

export default Button;
