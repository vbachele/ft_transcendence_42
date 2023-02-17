import styled from 'styled-components';
import {Auth} from './Auth';

export const Input = styled.input`
	border-radius: 4px;
	border-style: solid;
	padding: 16px;
`;

export const Label = styled.label`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 32px;
`;

export const StyledAuth = styled(Auth)`
	font-size: large;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-items: center;
	padding: 32px;
`;
