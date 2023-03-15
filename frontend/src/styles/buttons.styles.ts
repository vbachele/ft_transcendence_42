import styled from 'styled-components';

const Button = styled.button`
	display: flex;
	flex-basis: fit-content;
	min-width: 168px;
	justify-content: center;
	text-align: center;
	align-items: center;
	padding: 1em 2em;
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
	background-color: #dc4f19;
	border: none;

	&, a {
		color: #fff;
	}

	&:hover {
		background-color: #a53b13;
	}
	`;

// prettier-ignore
export const SecondaryButton = styled(Button)`
	background-color: #fff;
	border: 2px solid #dc4f19;

	&, a {
		color: #dc4f19;;
	}

	&:hover {
		background-color: #dc4f19;
		&, a {
			color: #fff;
		}
	}
`;

// prettier-ignore
export const SecondaryButtonSmall = styled(Button)`
	background-color: #fff;
	font-size: small;
	padding: 0.5em 1em;
	border: 2px solid #dc4f19;

	&, a {
		color: #dc4f19;
	}

	&:hover {
		background-color: #dc4f19;
		&, a {
			color: #fff;
		}
	}
`;

interface Iprops {
	backgroundColor?: string;
	border?: string;
	width?: string;
	height?: string;
}

export const PopupButton = styled(Button)<Iprops>`
	background-color: ${(p) => p.backgroundColor || 'transparent'};
	height: 50px;
	border: ${(p) => p.border || 'none'};
	margin: auto;
	width: ${(p) => p.width || ' clamp(50px, 35vw, 10rem)'};
	&,
	a {
		color: white;
	}
	:hover {
		transform: scaleY(1.08);
		border: 1.5px solid #e5e7eb;
	}
`;

export const DoubleAuthButton = styled.button<Iprops>`
	background-color: ${(p) => p.backgroundColor || '#DC4F19'};
	height: 30px;
	border: ${(p) => p.border || 'none'};
	margin: 0;
	border-radius: 20px;
	width: ${(p) => p.width || ' 10px'};
	&,
	a {
		color: white;
	}
	:hover {
		transform: scaleY(1.08);
		border: 1.5px solid #e5e7eb;
	}
`;
