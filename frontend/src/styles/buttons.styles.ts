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
	background-color: ${p => p.theme.colors.main};
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
	border: 2px solid ${p => p.theme.colors.main};

	&, a {
		color: ${p => p.theme.colors.main};;
	}

	&:hover {
		background-color: ${p => p.theme.colors.main};
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
	border: 2px solid ${p => p.theme.colors.main};

	&, a {
		color: ${p => p.theme.colors.main};
	}

	&:hover {
		background-color: ${p => p.theme.colors.main};
		&, a {
			color: #fff;
		}
	}
`;

interface IButtonProps {
	backgroundColor?: string;
	border?: string;
	width?: string;
	height?: string;
}

export const PopupButton = styled(Button)<IButtonProps>`
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


