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

	transition: all 0.25s;

	a {
		text-decoration: none;
		color: black;
	}

	&:active {
		transform: scale(0.95);
	}
`;

// prettier-ignore
export const PrimaryButton = styled(Button)`
	background-color: #e04f5f;
	border: none;

	&, a {
		color: #fff;
	}

	&:hover {
		background-color: #ce2437;
	}
	`;

// prettier-ignore
export const SecondaryButton = styled(Button)`
	background-color: #fff;
	&, a {
		color: #e04f5f;
	}

	&:hover {
		background-color: #931a27;
	}
	`;

// prettier-ignore
export const SecondaryButtonSmall = styled(Button)`
	background-color: #fff;
	font-size: small;
	padding: 10px 20px;
	border: 2px solid #e04f5f;

	&, a {
		color: #e04f5f;
	}

	&:hover {
		background-color: #e04f5f;
		&, a {
			color: #fff;
		}
	}
`;