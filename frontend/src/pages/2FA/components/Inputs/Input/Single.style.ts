import styled from 'styled-components';

export const Input = styled.input`
	/* Auto layout */
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 500;
	font-size: clamp(1rem, 5vw, 2.5rem);
	line-height: 28px;

	display: flex;
	flex-direction: row;
	text-align: center;

	width: clamp(3rem, 10vw, 6rem);
	height: clamp(5rem, 15vw, 10rem);
	/* height: 104px; */
	::placeholder {
		font-weight: 200;
		font-size: 1em;
		align-items: center;
		justify-content: center;
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
		border: 2px solid #e04f5f;
		border-color: red;
	}
	border: 1px solid #e6e6e6;
	border-radius: 5px;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
`;
