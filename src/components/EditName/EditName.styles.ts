import styled from 'styled-components';

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5em;
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75em;

	height: 70px;

	@media only screen and (max-width: 768px) {
		/* padding-top: 10px;
		padding-bottom: 80px; */
	}
`;

export const Input = styled.input`
	width: 300px;
	height: 48px;

	/* Text box */
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 28px;

	/* Inside auto layout */
	flex: none;
	order: 1;
	align-self: stretch;
	flex-grow: 1;
	background: #f9f9f9;
	border: 1px solid #e6e6e6;
	border-radius: 5px;
	padding-left: 24px;

	::placeholder {
		font-weight: 400;
		font-size: 14px;
	}

	/* @media only screen and (max-width: 768px) {
		width: 320px;
		height: 50px;
	} */
`;
