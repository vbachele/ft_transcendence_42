import styled from 'styled-components';

const Button = styled.button`
	display: flex;
	justify-content: center;
	padding: 14px 40px;
	border-radius: 37px;
	font-size: 16px;
	font-weight: 700;
	line-height: 28px;
	cursor: pointer;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	a {
		text-decoration: none;
		color: black;
	}
`;

export const PrimaryButton = styled(Button)`
	background-color: #e04f5f;
	border: none;
	color: #fff;
	a {
		color: white;
	}
`;

export const SecondaryButton = styled(Button)`
	background-color: #fff;
	color: #e04f5f;
`;

export const SecondaryButtonSmall = styled(Button)`
	background-color: #fff;
	color: #e04f5f;
	font-size: small;
	padding: 10px 20px;
`;
