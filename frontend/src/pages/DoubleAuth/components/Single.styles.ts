import styled from 'styled-components';

export const Input = styled.input`
	/* Auto layout */
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 500;
	font-size: clamp(1rem, 5vw, 2.5rem);
	line-height: 28px;
	background: rgba(249, 249, 249, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.64);
	border-radius: 5px;

	display: flex;
	flex-direction: row;
	text-align: center;
	color: ${(p) => p.theme.colors.secondary};
	width: clamp(2rem, 12vw, 6rem);
	height: clamp(5rem, 15vw, 10rem);
	::placeholder {
		font-weight: 150;
		font-size: 1em;
		align-items: center;
		justify-content: center;
		color: ${(p) => p.theme.colors.secondary};
	}
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}

	:focus {
		visibility: none;
		border: 2px solid #dc4f19;
	}
	border: 1px solid #e6e6e6;
	border-radius: 5px;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
`;
